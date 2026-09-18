// Estado de sessão do wizard de prêmio instantâneo (app/pages/cadastro-nota.vue):
// 1 = votação, 2 = cadastro do código, 3 = resultado/reveal, 4 = resgate
// (endereço + nota fiscal, só quando premiado).
export const useParticipacaoStore = defineStore('participacao', {
  state: () => ({
    idParticipacao: null as number | null,
    step: 1 as number
  }),
  actions: {
    setIdParticipacao(idParticipacao: number) {
      this.idParticipacao = idParticipacao
    },
    setStep(step: number) {
      this.step = step
    },
    invalidate() {
      this.idParticipacao = null
      this.step = 1
    }
  }
})
