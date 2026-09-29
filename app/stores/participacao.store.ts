import {
  WIZARD_STEP,
  type WizardStep
} from '~/utils/constants/wizardStep.constant'

export const useParticipacaoStore = defineStore('participacao', {
  state: () => ({
    idParticipacao: null as number | null,
    flavorId: null as number | null,
    step: WIZARD_STEP.VOTACAO as WizardStep
  }),
  actions: {
    setIdParticipacao(idParticipacao: number) {
      this.idParticipacao = idParticipacao
    },
    setFlavorId(flavorId: number) {
      this.flavorId = flavorId
    },
    setStep(step: WizardStep) {
      this.step = step
    },
    invalidate() {
      this.idParticipacao = null
      this.flavorId = null
      this.step = WIZARD_STEP.VOTACAO
    }
  }
})
