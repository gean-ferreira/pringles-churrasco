<script setup lang="ts">
import confetti from 'canvas-confetti'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useExtratoStore } from '~/stores/extrato.store'
import { toFormData } from '~/utils/functions/formData.function'
import { preloadImages } from '~/utils/functions/preloadImage.function'
import { RESULTADO_IMAGES } from '~/utils/constants/resultadoImages.constant'
import { WIZARD_STEP } from '~/utils/constants/wizardStep.constant'

const PRIZE_LABEL = 'Cartão Virtual - R$ 500,00'

const participacaoStore = useParticipacaoStore()
const extratoStore = useExtratoStore()

const { loading: opening, run: runOpen } = useAsyncSubmit()
const reward = ref<string | null>(null)
const isPremioModalOpen = ref(false)
// Lata dando as últimas balançadas depois que a requisição terminou.
const settling = ref(false)
const poppingLid = ref(false)
const showTicket = ref(false)
const showParabens = ref(false)
const showBrilho = ref(false)
const showBgBrilho = ref(false)
const showNaoGanhou = ref(false)
const isNaoGanhouModalOpen = ref(false)
const revealed = ref(false)

const confettiCanvasRef = ref<HTMLCanvasElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
let fireConfetti: confetti.CreateTypes | null = null
let confettiTimer: ReturnType<typeof setTimeout> | undefined
let premioModalTimer: ReturnType<typeof setTimeout> | undefined
const PREMIO_MODAL_DELAY_MS = 3000
const TAMPA_SOBE_MS = 800
const NAO_GANHOU_FADE_MS = 600
const TEMPO_LEITURA_MS = 1400
const NAO_GANHOU_MODAL_DELAY_MS =
  TAMPA_SOBE_MS + NAO_GANHOU_FADE_MS + TEMPO_LEITURA_MS
const CONFETTI_COLORS = ['#fbc521', '#ea002a', '#009f4a', '#ffffff']

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
    // Sem animação (motion-reduce) o `animationend` nunca dispara.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onShakeSettleEnd()
    }
  })
}

// `@animationend` dispara uma vez por animação (rotate + translate); o guard
// evita rodar duas vezes.
function onShakeSettleEnd() {
  if (!settling.value) return
  settling.value = false
  revealed.value = true
  poppingLid.value = true

  if (!reward.value) {
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
  participacaoStore.setStep(WIZARD_STEP.NOTA_FISCAL)
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
      <!-- `opacity` em vez de v-if: some sem mudar a altura, então a lata não pula. -->
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

      <!-- translate-y num wrapper próprio: na lata colidiria com o `translate` da keyframe. -->
      <div class="mx-auto mt-8 translate-y-6">
        <div ref="stageRef" class="relative">
          <img
            v-if="showBgBrilho"
            src="/images/cadastro-nota-bg-brilho.png"
            alt=""
            aria-hidden="true"
            class="animate-bg-brilho-pop pointer-events-none absolute top-0 left-1/2 w-[260%] max-w-none -translate-x-1/2 -translate-y-2/3 motion-reduce:animate-none"
          />

          <!-- Lata + tampa animadas no mesmo wrapper pra girar em torno de um centro só. -->
          <div
            class="relative"
            :class="{
              'animate-lata-shake motion-reduce:animate-none': opening,
              'animate-lata-shake-settle motion-reduce:animate-none': settling
            }"
            @animationend="onShakeSettleEnd"
          >
            <img
              src="/images/lata.png"
              alt=""
              aria-hidden="true"
              width="592"
              height="474"
              class="h-auto w-full object-contain"
            />
            <img
              v-if="showBrilho"
              src="/images/cadastro-nota-brilho.png"
              alt=""
              aria-hidden="true"
              class="animate-brilho-pop pointer-events-none absolute top-0 left-[52%] w-[140%] max-w-none -translate-x-1/2 -translate-y-[89%] motion-reduce:animate-none"
            />
            <div class="absolute top-0 left-1/2 -translate-x-1/2">
              <!-- Animação na img: no wrapper colidiria com o -translate-x-1/2. -->
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

          <!-- -mt = metade do vão final entre tampa e lata (~255px mobile / ~484px desktop). -->
          <p
            v-if="showNaoGanhou"
            class="animate-nao-ganhou-fade text-h2 text-shadow-comic text-stroke-comic md:text-h1-lg absolute top-0 left-1/2 -mt-32 w-max -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white uppercase motion-reduce:animate-none md:-mt-60"
          >
            Ooops.<br />Não foi dessa<br />vez!
          </p>

          <!-- Fora do wrapper da lata pra não balançar junto. -->
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
