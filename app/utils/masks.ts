export const MASK_CPF = '###.###.###-##'
export const MASK_PHONE = '(##) #####-####'
export const MASK_DATE = '##/##/####'
export const MASK_CODE = '######'

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

// Teclado numérico só quando o PIN é só dígitos — senão esconderia as letras.
const PIN_CODE_INPUT_MODES: Record<PinCodeFormat, 'numeric' | 'text'> = {
  numeric: 'numeric',
  alpha: 'text',
  alphanumeric: 'text'
}

export const MASK_PIN_CODE =
  PIN_CODE_TOKEN[PIN_CODE_FORMAT].repeat(PIN_CODE_LENGTH)
export const PIN_CODE_INPUT_MODE = PIN_CODE_INPUT_MODES[PIN_CODE_FORMAT]
