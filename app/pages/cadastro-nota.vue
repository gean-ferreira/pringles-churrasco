<script setup lang="ts">
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

definePageMeta({
  middleware: ['auth', 'check-promotion'],
  name: 'Cadastro de nota'
})

useSeoMeta({
  title: 'Cadastrar código — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const { loading: checkingPending, run: runCheckPending } = useAsyncSubmit()
const participacaoStore = useParticipacaoStore()
const notificationModalStore = useNotificationModalStore()

// Indicador de step só tem 3 posições (Vote / Cadastre seu PIN / Resultado)
// — o resgate (endereço + nota) é uma sub-etapa de "Resultado".
const indicatorStep = computed<1 | 2 | 3>(() =>
  participacaoStore.step >= 3 ? 3 : (participacaoStore.step as 1 | 2)
)

// Entrar na página sempre volta pro início do wizard (votação) — o único
// jeito de pular pra frente é a checagem de pendência, disparada só depois
// de votar (ver onVoted).
onMounted(() => {
  participacaoStore.setStep(1)
})

watch(
  () => participacaoStore.step,
  () => window.scrollTo({ top: 0 })
)

// Só depois de votar checamos se há um fluxo pendente (ex.: usuário já
// cadastrou o código mas fechou a aba antes de abrir a lata ou preencher o
// endereço) — nesse caso pulamos o step de código e vamos direto pro step
// onde ele parou.
function onVoted() {
  runCheckPending(async () => {
    const res = await useFetchData<{
      idParticipacao: number
      mensagem: string
    }>('/Premio/EtapaPremioPendente', {
      method: 'GET',
      requiresAuth: true
    })

    const backendStep = Number(res.mensagem)
    if (!res.idParticipacao || !backendStep || backendStep <= 1) {
      participacaoStore.setStep(2)
      return
    }

    participacaoStore.setIdParticipacao(res.idParticipacao)
    // 2 = abrir lata pendente (wizard step 3) | 3 = endereço pendente (wizard step 4)
    participacaoStore.setStep(backendStep === 2 ? 3 : 4)
    notificationModalStore.openModal({
      title: backendStep === 2 ? 'Abra sua lata' : 'Preencha seu endereço',
      description:
        backendStep === 2
          ? 'Parece que você ainda não usou sua chance de abrir a lata.'
          : 'Parece que você ainda não preencheu seu endereço.',
      actions: [
        {
          label: 'Continuar',
          handler: () => notificationModalStore.closeModal()
        }
      ]
    })
  })
}
</script>

<template>
  <div>
    <CadastroNotaStepIndicator :current-step="indicatorStep" />

    <section
      class="relative overflow-hidden bg-(--color-brand-secondary) pt-14 md:pt-25"
    >
      <AppBgPattern />
      <div class="relative container flex justify-center">
        <CadastroNotaStepVotacao
          v-if="participacaoStore.step === 1"
          :disabled="checkingPending"
          @voted="onVoted"
        />
        <CadastroNotaStepCodigo
          v-else-if="participacaoStore.step === 2"
          @registered="participacaoStore.setStep(3)"
        />
        <CadastroNotaStepResultado v-else-if="participacaoStore.step === 3" />
        <div v-else class="w-full max-w-[540px]">
          <AppComicCard>
            <template #title>Informe seus dados de contato</template>
            <template #description>
              Estes dados serão utilizados para enviar seu prêmio até você.
            </template>

            <CadastroNotaStepResgate />
          </AppComicCard>
        </div>
      </div>
    </section>
  </div>
</template>
