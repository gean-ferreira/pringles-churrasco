import { defineRule, configure } from 'vee-validate'
import { parseDate } from '~/utils/functions/date.function'

let rulesRegistered = false

function registerRequiredRule() {
  defineRule('required', (value: unknown) => {
    if (value === null || value === undefined) {
      return 'Este campo é obrigatório'
    }
    if (typeof value === 'string') {
      return value.trim().length > 0 || 'Este campo é obrigatório'
    }
    if (Array.isArray(value)) {
      return value.length > 0 || 'Este campo é obrigatório'
    }
    if (value instanceof File) {
      return true
    }
    if (typeof value === 'boolean') {
      return value ? true : 'Este campo é obrigatório'
    }
    return true
  })
}

function registerEmailRule() {
  defineRule('email', (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Por favor, digite um e-mail válido'
    }
    return true
  })
}

function registerNoNumbersRule() {
  defineRule('noNumbers', (value: string) => {
    if (/\d/.test(value)) {
      return 'Não pode conter números'
    }
    return true
  })
}

function registerNoSpecialCharactersRule() {
  defineRule('noSpecialCharacters', (value: string) => {
    if (!/^[\w\sáéíóúâêîôûàèìòùãẽĩõũçÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÃẼĨÕŨÇ]*$/i.test(value)) {
      return 'Apenas letras (incluindo acentos) são permitidas'
    }
    return true
  })
}

function registerNoLeadingWhitespaceRule() {
  defineRule('noLeadingWhitespace', (value: string) => {
    if (value && /^\s+/.test(value)) {
      return 'Não pode haver espaços em branco no início'
    }
    return true
  })
}

function isCpfCheckDigitValid(
  base: string,
  weightStart: number,
  expectedDigit: string
) {
  let sum = 0
  for (let weight = weightStart; weight > 1; weight--) {
    sum += Number(base.charAt(weightStart - weight)) * weight
  }
  const result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === Number(expectedDigit)
}

function registerCpfRule() {
  defineRule('validCPF', (value: string) => {
    const cpf = value.replace(/[.-]/g, '')

    if (cpf.length < 11) return 'CPF incompleto.'

    const hasAllSameDigits = [...cpf].every((digit) => digit === cpf[0])
    if (hasAllSameDigits) return 'CPF com dígitos repetidos.'

    const checkDigits = cpf.substring(9)

    if (!isCpfCheckDigitValid(cpf.substring(0, 9), 10, checkDigits.charAt(0))) {
      return 'CPF inválido.'
    }
    if (
      !isCpfCheckDigitValid(cpf.substring(0, 10), 11, checkDigits.charAt(1))
    ) {
      return 'CPF inválido.'
    }

    return true
  })
}

function registerCellphoneRule() {
  defineRule('cellphone', (value: string) => {
    const digits = value.replace(/[^0-9]+/g, '')
    const re =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(9\d{4}-?\d{4})$/
    if (!re.test(digits)) {
      return 'Por favor, insira um número de celular válido'
    }
    return true
  })
}

function registerCepRule() {
  defineRule('cep', (value: string) => {
    return (
      /^\d{5}-?\d{3}$/.test(String(value)) || 'Por favor, insira um CEP válido'
    )
  })
}

function registerCheckboxRule() {
  defineRule('checkbox', (value: boolean) => {
    return value === true || 'Aceite obrigatório.'
  })
}

function registerConfirmedRule() {
  defineRule('confirmed', (value: string, [target]: string[]) => {
    return value === target || 'Dados divergentes'
  })
}

function registerMinRule() {
  defineRule('min', (value: string, [length, message]: [number, string]) => {
    if (value && value.length < length) {
      return message ?? `Este campo deve ter pelo menos ${length} caracteres`
    }
    return true
  })
}

function registerMaxRule() {
  defineRule('max', (value: string, [length, message]: [number, string]) => {
    if (value && value.length > length) {
      return message ?? `Este campo não deve exceder ${length} caracteres`
    }
    return true
  })
}

function registerDateValidRule() {
  defineRule('dateValid', (value: string) => {
    const re =
      /^(?:(?:31([/\-.])(?:0?[13578]|1[02]))\1|(?:(?:29|30)([/\-.])(?:0?[1,3-9]|1[0-2])\2))(?:\d{4})$|^(?:29([/\-.])0?2\3(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:[02468][048]00|[13579][26]00)))$|^(?:0?[1-9]|1\d|2[0-8])([/\-.])(?:0?[1-9]|1[0-2])\4(?:\d{4})$/
    if (!re.test(String(value))) {
      return 'Insira uma data válida.'
    }
    return true
  })
}

function registerDateNotFutureRule() {
  defineRule('dateNotFuture', (value: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return parseDate(value) <= today || 'Data superior a atual'
  })
}

function registerDateMinRule() {
  defineRule('dateMin', (value: string, [minDateStr = '']: string[]) => {
    return (
      parseDate(value) >= parseDate(minDateStr) ||
      'Data fora do período de participação'
    )
  })
}

function registerMinAgeRule() {
  defineRule('minAge', (value: string, [minAge = 0]: number[]) => {
    const birthDate = parseDate(value)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age >= minAge || `Você deve ter mais de ${minAge} anos`
  })
}

function registerFileTypeRule() {
  defineRule('fileType', (value: unknown, allowedTypes: string[] = []) => {
    const file = Array.isArray(value)
      ? (value[0] as File | undefined)
      : (value as File | null) || undefined
    if (!file || allowedTypes.length === 0) return true

    const ext = file.name.split('.').pop()?.toLowerCase()
    const allowed = allowedTypes.map((t) => t.toLowerCase())
    const formatList = (items: string[]) =>
      items.length > 1
        ? `${items.slice(0, -1).join(', ')} ou ${items.at(-1)}`
        : (items[0] ?? 'desconhecido')

    if (ext && !allowed.includes(ext)) {
      return `O arquivo deve ser do tipo: ${formatList(allowed)}`
    }
    return true
  })
}

function registerFileSizeRule() {
  defineRule('fileSize', (value: unknown, [maxSize]: [number]) => {
    const file = value as File | null
    if (!file || file.size > maxSize) {
      return `O tamanho do arquivo não deve exceder ${(maxSize / 1000000).toFixed()} MB`
    }
    return true
  })
}

export function registerValidationRules() {
  if (rulesRegistered) return
  rulesRegistered = true

  registerRequiredRule()
  registerEmailRule()
  registerNoNumbersRule()
  registerNoSpecialCharactersRule()
  registerNoLeadingWhitespaceRule()
  registerCpfRule()
  registerCellphoneRule()
  registerCepRule()
  registerCheckboxRule()
  registerConfirmedRule()
  registerMinRule()
  registerMaxRule()
  registerDateValidRule()
  registerDateNotFutureRule()
  registerDateMinRule()
  registerMinAgeRule()
  registerFileTypeRule()
  registerFileSizeRule()

  configure({ validateOnInput: true })
}
