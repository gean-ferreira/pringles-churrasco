import { onlyDigits } from '~/utils/functions/sanitize.function'

export interface CepEndereco {
  rua: string
  bairro: string
  cidade: string
  estado: string
}

export function useCepLookup() {
  const looking = ref(false)

  async function lookup(cep: string): Promise<CepEndereco | null> {
    const digits = onlyDigits(cep)
    if (digits.length !== 8) return null

    looking.value = true
    try {
      const response = await $fetch<{
        logradouro?: string
        bairro?: string
        localidade?: string
        uf?: string
        erro?: boolean | string
      }>(`https://viacep.com.br/ws/${digits}/json/`)
      if (response.erro) return null
      return {
        rua: response.logradouro ?? '',
        bairro: response.bairro ?? '',
        cidade: response.localidade ?? '',
        estado: response.uf ?? ''
      }
    } catch {
      return null // falha em silêncio — quem chama decide (libera preenchimento manual)
    } finally {
      looking.value = false
    }
  }

  return { lookup, looking }
}
