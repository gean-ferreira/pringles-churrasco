// Código impresso na embalagem — step 2 do wizard de prêmio instantâneo em
// cadastro-nota.vue. O upload da nota fiscal acontece só no resgate
// (endereço), etapa condicionada a ter ganhado um prêmio.

// Formato do PIN — trocar aqui quando o cliente decidir:
// 'numeric' (só números), 'alpha' (só letras) ou 'alphanumeric' (os dois).
export type PinCodeFormat = 'numeric' | 'alpha' | 'alphanumeric'
export const PIN_CODE_FORMAT: PinCodeFormat = 'alphanumeric'
export const PIN_CODE_LENGTH = 7

// Tokens do maska: # dígito, @ letra, * letra ou dígito.
const PIN_CODE_TOKEN: Record<PinCodeFormat, string> = {
  numeric: '#',
  alpha: '@',
  alphanumeric: '*'
}

export const MASK_PIN_CODE =
  PIN_CODE_TOKEN[PIN_CODE_FORMAT].repeat(PIN_CODE_LENGTH)
export const PIN_CODE_INPUT_MODE =
  PIN_CODE_FORMAT === 'numeric' ? 'numeric' : 'text'

export const pincodeSchema: Record<string, string> = {
  codigo: `required|min:${PIN_CODE_LENGTH}|max:${PIN_CODE_LENGTH}`
}
