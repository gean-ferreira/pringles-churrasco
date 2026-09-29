<script setup lang="ts">
import confetti from 'canvas-confetti'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useExtratoStore } from '~/stores/extrato.store'
import { toFormData } from '~/utils/functions/formData.function'
import { preloadImages } from '~/utils/functions/preloadImage.function'
import { RESULTADO_IMAGES } from '~/utils/constants/resultadoImages.constant'

const PRIZE_LABEL = 'Cartão Virtual - R$ 500,00'

const participacaoStore = useParticipacaoStore()
const extratoStore = useExtratoStore()

const { loading: opening, run: runOpen } = useAsyncSubmit()
const reward = ref<string | null>(null)
const isPremioModalOpen = ref(false)
// true enquanto a lata balança só mais duas vezes (efeito de "assentar")
// depois que a requisição do prêmio já terminou.
const settling = ref(false)
// true depois que a lata assenta — dispara a tampa sendo arremessada pra
// fora (Figma 9874:32082) e o ticket aparecendo (Figma 9874:28480), que
// rodam juntos na mesma timeline de 12s.
const poppingLid = ref(false)
const showTicket = ref(false)
const showParabens = ref(false)
const showBrilho = ref(false)
const showBgBrilho = ref(false)
// Sem prêmio: só o "Poxa, não foi dessa vez!" com fade, depois a modal.
const showNaoGanhou = ref(false)
const isNaoGanhouModalOpen = ref(false)
// true a partir do momento em que a lata assenta (ganhando ou não) — segura
// título/botão escondidos daí em diante.
const revealed = ref(false)

const confettiCanvasRef = ref<HTMLCanvasElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
let fireConfetti: confetti.CreateTypes | null = null
let confettiTimer: ReturnType<typeof setTimeout> | undefined
let premioModalTimer: ReturnType<typeof setTimeout> | undefined
// Tempo pra tampa/ticket/parabéns assentarem antes da modal cobrir a tela.
const PREMIO_MODAL_DELAY_MS = 3000
// Sem prêmio: tampa sobe (800ms) + fade do texto (600ms) + tempo pra ler
// antes da modal.
const NAO_GANHOU_MODAL_DELAY_MS = 2800
const CONFETTI_COLORS = ['#fbc521', '#ea002a', '#009f4a', '#ffffff']

// Canvas fixo em tela cheia: o confete sai da posição da tampa (topo do palco)
// e não fica preso ao tamanho do componente.
function launchConfetti() {
  if (!confettiCanvasRef.value || !stageRef.value) return
  fireConfetti ??= confetti.create(confettiCanvasRef.value, {
    resize: true,
    useWorker: true,
    disableForReducedMotion: true
  })
  const fire = fireConfetti
  const rect = stageRef.value.getBoundingClientRect()

  fire({
    particleCount: 90,
    spread: 100,
    startVelocity: 55,
    ticks: 300,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: rect.top / window.innerHeight
    },
    colors: CONFETTI_COLORS
  })

  confettiTimer = setTimeout(() => {
    fire({
      particleCount: 50,
      angle: 60,
      spread: 70,
      startVelocity: 60,
      origin: { x: 0, y: 0.7 },
      colors: CONFETTI_COLORS
    })
    fire({
      particleCount: 50,
      angle: 120,
      spread: 70,
      startVelocity: 60,
      origin: { x: 1, y: 0.7 },
      colors: CONFETTI_COLORS
    })
  }, 400)
}

function openLata() {
  runOpen(async () => {
    // Chamar uma única vez por participação — o back registra a interação.
    // As imagens da revelação carregam em paralelo com a requisição (a lata
    // segue balançando), então o pop nunca começa com imagem faltando. Se
    // a página já pré-carregou, resolve na hora.
    const [res] = await Promise.all([
      useFetchData<{ haveReward: boolean }>('/Reward/Get', {
        method: 'POST',
        body: toFormData({ participationId: participacaoStore.idParticipacao }),
        requiresAuth: true
      }),
      preloadImages(RESULTADO_IMAGES)
    ])
    // A API só diz se ganhou; o prêmio instantâneo é único na promoção.
    reward.value = res.haveReward ? PRIZE_LABEL : null
    extratoStore.invalidate()
    settling.value = true
    // Com movimento reduzido o `motion-reduce:animate-none` tira a animação
    // de assentar, então `animationend` nunca dispara — sem isso a revelação
    // e a modal do prêmio nunca aconteciam.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onShakeSettleEnd()
    }
  })
}

// `@animationend` dispara pras duas animações (rotate + translate) ao mesmo
// tempo, já que têm a mesma duração — o guard evita rodar duas vezes.
function onShakeSettleEnd() {
  if (!settling.value) return
  settling.value = false
  revealed.value = true
  poppingLid.value = true

  if (!reward.value) {
    // Sem prêmio: a tampa sai igual, mas sem confete/brilho/ticket — só o
    // texto aparecendo no vão entre tampa e lata, e depois a modal com o
    // caminho pro extrato.
    showNaoGanhou.value = true
    premioModalTimer = setTimeout(() => {
      isNaoGanhouModalOpen.value = true
    }, NAO_GANHOU_MODAL_DELAY_MS)
    return
  }

  showTicket.value = true
  showParabens.value = true
  showBrilho.value = true
  showBgBrilho.value = true
  launchConfetti()
  premioModalTimer = setTimeout(() => {
    isPremioModalOpen.value = true
  }, PREMIO_MODAL_DELAY_MS)
}

onBeforeUnmount(() => {
  clearTimeout(confettiTimer)
  clearTimeout(premioModalTimer)
  fireConfetti?.reset()
})

function onResgatarPremio() {
  isPremioModalOpen.value = false
  participacaoStore.setStep(4)
}

const ctaRef = ref()
onMounted(() => {
  ctaRef.value?.focus()
})
</script>

<template>
  <div class="flex w-full flex-col justify-end gap-8 text-center">
    <canvas
      ref="confettiCanvasRef"
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-50 size-full motion-reduce:hidden"
    />

    <div class="flex w-full flex-col items-center text-center">
      <!-- Fade num wrapper só (não em cada filho) — título, descrição e
             botão desaparecem sempre juntos, na mesma transição. `opacity`
             em vez de v-if/invisible: some da tela sem desmontar nem
             recalcular altura, então o resto do layout (lata) não pula.
             `settling || poppingLid`: uma vez que a requisição termina, não
             volta mais — `settling` vira `false` assim que a tampa começa a
             sair (poppingLid), então usar só `settling` fazia esse bloco
             reaparecer nesse momento e empurrar o ticket. `revealed` cobre
             também o caso sem prêmio, em que a tampa não sai. -->
      <div
        class="flex w-full flex-col items-center transition-opacity duration-300"
        :class="
          settling || revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
        "
      >
        <h1
          class="text-h2 text-shadow-comic text-stroke-comic md:text-h1-2xl font-bold text-white uppercase"
        >
          Dê um POP<br />com Pringles®
        </h1>

        <p
          class="text-h3 mt-4 mb-14 font-bold text-(--color-brand-outline) uppercase"
        >
          Clique no botão abaixo e descubra<br />se você foi premiado
        </p>

        <AppButton
          ref="ctaRef"
          type="button"
          variant="success"
          class="w-full max-w-[384px]"
          :loading="opening"
          :disabled="settling || revealed"
          @click="openLata"
        >
          {{ opening ? 'Abrindo...' : 'Quero descobrir' }}
        </AppButton>
      </div>

      <!-- Wrapper externo só pra empurrar o conjunto pra baixo (esconder o
             corte da lata) — sem animação, senão colidiria com o `translate`
             da keyframe abaixo. -->
      <div class="mx-auto mt-8 translate-y-6">
        <!-- "Palco": referência de coordenadas comum pro grupo rígido
               (lata+tampa) e pra camada de efeitos (ticket, e depois
               iluminação/confete) — cada efeito se posiciona aqui dentro,
               do seu próprio jeito, em vez de todo mundo competir pelo
               centro. -->
        <div ref="stageRef" class="relative">
          <!-- Sunburst de fundo — primeiro filho do palco, então fica atrás
                 de tudo (lata, tampa, brilho, ticket, parabéns). Centralizado
                 por -translate-x/y (propriedade `translate`), que não colide
                 com o `rotate`/`scale` da keyframe. -->
          <img
            v-if="showBgBrilho"
            src="/images/cadastro-nota-bg-brilho.png"
            alt=""
            aria-hidden="true"
            class="animate-bg-brilho-pop pointer-events-none absolute top-0 left-1/2 w-[260%] max-w-none -translate-x-1/2 -translate-y-2/3 motion-reduce:animate-none"
          />

          <!-- Lata + tampa giram juntas, como um objeto rígido só — cada
                 `<img>` tem seu próprio centro, então animar as duas
                 separadamente fazia a tampa balançar em torno do centro
                 dela mesma, com um ângulo bem diferente do da lata. Balança
                 sem parar enquanto a requisição está rodando (`opening`) e,
                 assim que ela termina, mais duas voltas só (`settling`)
                 antes de assentar. -->
          <div
            class="relative"
            :class="{
              'animate-lata-shake motion-reduce:animate-none': opening,
              'animate-lata-shake-settle motion-reduce:animate-none': settling
            }"
            @animationend="onShakeSettleEnd"
          >
            <!-- width/height = tamanho real do PNG: reservam o espaço (e a
                   proporção) antes da imagem carregar. Sem eles o palco
                   inteiro tem largura/altura 0 até o load e a tela colapsa. -->
            <img
              src="/images/lata.png"
              alt=""
              aria-hidden="true"
              width="592"
              height="474"
              class="h-auto w-full object-contain"
            />
            <!-- Brilho no mesmo ponto da tampa (logo acima do pote), mas
                   antes dela no DOM — fica atrás quando ela é arremessada. -->
            <img
              v-if="showBrilho"
              src="/images/cadastro-nota-brilho.png"
              alt=""
              aria-hidden="true"
              class="animate-brilho-pop pointer-events-none absolute top-0 left-[52%] w-[140%] max-w-none -translate-x-1/2 -translate-y-[89%] motion-reduce:animate-none"
            />
            <div class="absolute top-0 left-1/2 -translate-x-1/2">
              <!-- animate-tampa-pop na img, não no wrapper: ele também
                     escreve em `translate`, então colidiria com o
                     -translate-x-1/2 estático que centraliza a tampa. -->
              <img
                src="/images/tampa.png"
                alt=""
                aria-hidden="true"
                width="283"
                height="73"
                class="w-full"
                :class="{
                  'animate-tampa-pop md:animate-tampa-pop-desktop motion-reduce:animate-none':
                    poppingLid
                }"
              />
            </div>
          </div>

          <!-- Sem prêmio: texto com fade centralizado no vão entre a lata e
                 a tampa já arremessada. A tampa para ~255px (mobile) / ~484px
                 (desktop) acima da lata (translate final da keyframe menos a
                 altura dela) — o -mt leva o centro do texto pra metade disso. -->
          <p
            v-if="showNaoGanhou"
            class="animate-nao-ganhou-fade text-h2 text-shadow-comic text-stroke-comic md:text-h1-lg absolute top-0 left-1/2 -mt-32 w-max -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white uppercase motion-reduce:animate-none md:-mt-60"
          >
            Ooops.<br />Não foi dessa<br />vez!
          </p>

          <!-- Camada de efeitos da revelação — fora do grupo rígido de
                 cima, então não balança/gira junto com a lata. `bottom-full`
                 encosta o conjunto inteiro acima do palco (sem precisar de
                 translate manual), e o flex-col empilha os itens entre si
                 (parabéns, depois ticket, e no futuro iluminação/confete)
                 com `gap` — cada um só entra em fluxo, sem competir por
                 posição nem cair em cima do outro. -->
          <div
            class="pointer-events-none absolute inset-x-0 bottom-full flex flex-col items-center gap-10 pb-4 md:gap-18"
          >
            <h1
              v-if="showParabens"
              class="animate-parabens-pop text-h2 text-shadow-comic text-stroke-comic md:text-h1-lg font-bold text-white uppercase motion-reduce:animate-none"
            >
              Parabéns!!<br />Você ganhou.
            </h1>

            <img
              v-if="showTicket"
              src="/images/cadastro-nota-premio-ticket.png"
              alt="Ticket de prêmio Pringles"
              width="333"
              height="154"
              class="animate-ticket-pop h-auto w-[45%] -rotate-[26deg] motion-reduce:animate-none"
            />
          </div>
        </div>
      </div>
    </div>

    <CadastroNotaPremioModal
      :open="isPremioModalOpen"
      :premio="reward ?? ''"
      @update:open="isPremioModalOpen = $event"
      @resgatar="onResgatarPremio"
    />
    <CadastroNotaNaoGanhouModal
      :open="isNaoGanhouModalOpen"
      @update:open="isNaoGanhouModalOpen = $event"
    />
  </div>
</template>
