import type { Participacao, NumeroSorte } from '~/types/extrato'

export const useExtratoStore = defineStore('extrato', () => {
  const participacoes = ref<Participacao[]>([])
  const numerosSorte = ref<NumeroSorte[]>([])

  // null = nunca carregado nesta sessão. Diferente de "carregado e vazio",
  // que não deve disparar novo fetch a cada visita.
  const loadedAt = ref<number | null>(null)
  const isLoaded = computed(() => loadedAt.value !== null)

  function setExtrato(data: { participacoes: Participacao[]; numerosSorte: NumeroSorte[] }) {
    participacoes.value = data.participacoes
    numerosSorte.value = data.numerosSorte
    loadedAt.value = Date.now()
  }

  function invalidate() {
    participacoes.value = []
    numerosSorte.value = []
    loadedAt.value = null
  }

  return { participacoes, numerosSorte, isLoaded, setExtrato, invalidate }
})
