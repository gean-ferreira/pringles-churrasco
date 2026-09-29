<script setup lang="ts">
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { useUserPrefill } from '~/composables/useUserPrefill'
import { toFormData } from '~/utils/functions/formData.function'
import { preloadImages } from '~/utils/functions/preloadImage.function'
import { RESULTADO_IMAGES } from '~/utils/constants/resultadoImages.constant'
import { WIZARD_STEP } from '~/utils/constants/wizardStep.constant'

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

// No indicador, a nota fiscal é sub-etapa de "Resultado".
const indicatorStep = computed(
  () => Math.min(participacaoStore.step, WIZARD_STEP.RESULTADO) as 1 | 2 | 3
)

onMounted(() => {
  participacaoStore.setStep(WIZARD_STEP.VOTACAO)
  checkPending()
  // Imagens do resultado baixam em idle, sem disputar banda com o load da página.
  const preload = () => preloadImages(RESULTADO_IMAGES)
  if ('requestIdleCallback' in window) requestIdleCallback(preload)
  else setTimeout(preload, 1000)
})

watch(
  () => participacaoStore.step,
  () => window.scrollTo({ top: 0 })
)

// Retoma o wizard onde o usuário parou (ex.: fechou a aba antes de abrir a lata).
function checkPending() {
  runCheckPending(async () => {
    const user = await loadUser()
    if (!user) return

    const res = await useFetchData<CheckPendingResponse>(
      '/Participation/CheckPending',
      {
        method: 'POST',
        body: toFormData({ userId: user.id }),
        requiresAuth: true
      }
    )

    const pending = res.responseDto
    // TODO(pendencia): com as duas pendências, a nota só reaparece quando o
    // usuário voltar à página — encadear NOTA_FISCAL depois do resultado.
    const pendingReward = pending.pendingReward && pending.rewardParticipationId
    const pendingAttachment =
      pending.pendingAttachment && pending.attachmentParticipationId
    if (!pendingReward && !pendingAttachment) return

    participacaoStore.setIdParticipacao(
      (pendingReward
        ? pending.rewardParticipationId
        : pending.attachmentParticipationId) as number
    )
    participacaoStore.setStep(
      pendingReward ? WIZARD_STEP.RESULTADO : WIZARD_STEP.NOTA_FISCAL
    )
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
          v-if="participacaoStore.step === WIZARD_STEP.VOTACAO"
          :disabled="checkingPending"
          @voted="participacaoStore.setStep(WIZARD_STEP.CODIGO)"
        />
        <CadastroNotaStepCodigo
          v-else-if="participacaoStore.step === WIZARD_STEP.CODIGO"
          @registered="participacaoStore.setStep(WIZARD_STEP.RESULTADO)"
        />
        <CadastroNotaStepResultado
          v-else-if="participacaoStore.step === WIZARD_STEP.RESULTADO"
        />
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
