import { PIN_CODE_LENGTH } from '~/utils/masks'

export const pincodeSchema: Record<string, string> = {
  codigo: `required|min:${PIN_CODE_LENGTH}|max:${PIN_CODE_LENGTH}`
}
