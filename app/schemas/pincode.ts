export type PinCodeFormat = 'numeric' | 'alpha' | 'alphanumeric'
// TODO: confirmar o formato do PIN com o cliente.
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
