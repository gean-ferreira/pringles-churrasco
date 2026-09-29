import type { Participacao } from '~/types/extrato'

export const useExtratoStore = defineStore('extrato', () => {
  const participacoes = ref<Participacao[]>([])

  // null = nunca carregado (diferente de carregado e vazio).
  const loadedAt = ref<number | null>(null)
  const isLoaded = computed(() => loadedAt.value !== null)

  function setExtrato(data: Participacao[]) {
    participacoes.value = data
    loadedAt.value = Date.now()
  }

  function invalidate() {
    participacoes.value = []
    loadedAt.value = null
  }

  return { participacoes, isLoaded, setExtrato, invalidate }
})
