// Estado de sessão do fluxo de cadastro de nota + abertura de lata (prêmio
// instantâneo) — ver app/pages/cadastro-nota.vue e app/pages/abrir-lata.vue.
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
