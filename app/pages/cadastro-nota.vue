<script setup lang="ts">
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { useUserPrefill } from '~/composables/useUserPrefill'
import { toFormData } from '~/utils/functions/formData.function'

interface CheckPendingResponse {
  responseDto: {
    pendingReward: boolean
    rewardParticipationId: number | null
    pendingAttachment: boolean
    attachmentParticipationId: number | null
  }
}

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
const { loadUser } = useUserPrefill()

// Indicador de step só tem 3 posições (Vote / Cadastre seu PIN / Resultado)
// — o envio da nota fiscal é uma sub-etapa de "Resultado".
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
// cadastrou o código mas fechou a aba antes de abrir a lata ou enviar a
// nota fiscal) — nesse caso pulamos o step de código e vamos direto pro step
// onde ele parou.
function onVoted() {
  runCheckPending(async () => {
    const user = await loadUser()
    if (!user) return

    // TODO(back): CheckPending deveria usar o usuário do token, não userId no
    // form (ver ap.md, "Observações e pontos de atenção" item 2).
    const res = await useFetchData<CheckPendingResponse>(
      '/Participation/CheckPending',
      {
        method: 'POST',
        body: toFormData({ userId: user.id }),
        requiresAuth: true
      }
    )

    const pending = res.responseDto
    // Prêmio pendente (lata não aberta) → wizard step 3 | nota fiscal
    // pendente → wizard step 4.
    const pendingReward = pending.pendingReward && pending.rewardParticipationId
    const pendingAttachment =
      pending.pendingAttachment && pending.attachmentParticipationId
    if (!pendingReward && !pendingAttachment) {
      participacaoStore.setStep(2)
      return
    }

    participacaoStore.setIdParticipacao(
      (pendingReward
        ? pending.rewardParticipationId
        : pending.attachmentParticipationId) as number
    )
    participacaoStore.setStep(pendingReward ? 3 : 4)
    notificationModalStore.openModal({
      title: pendingReward ? 'Abra sua lata' : 'Envie sua nota fiscal',
      description: pendingReward
        ? 'Parece que você ainda não usou sua chance de abrir a lata.'
        : 'Parece que você ainda não enviou sua nota fiscal.',
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
        <div v-else class="w-full max-w-[592px] pb-14 md:pb-25">
          <AppComicCard align="left">
            <template #title>cadastro de nota fiscal</template>
            <template #description>
              Está quase lá! Envie sua nota fiscal para dar continuidade<br />
              ao processo de validação.
            </template>

            <CadastroNotaStepResgate />
          </AppComicCard>
        </div>
      </div>
    </section>
  </div>
</template>
