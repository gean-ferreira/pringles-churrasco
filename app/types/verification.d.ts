// Resposta de /Authentication/GenerateAuthenticationCode, /ResendCode e
// /User/Create: e-mail mascarado + token (CPF criptografado) usado no /Login.
export interface AuthCodeResponse {
  title: string
  message: string
  mask: string
  token: string
}

export interface LoginResponse {
  title: string
  message: string
  token: string
  externalId: string
  firstLogin: boolean
}

// TODO: legado do fluxo de exclusão com OTP (/Usuario/GerarCodigoExclusao) —
// remover quando a exclusão migrar para DELETE /User/Delete.
export interface VerificationMascaras {
  mascara: string
  tempoExpiracao: number
  token: string
}

export type VerificationAction = 'login' | 'cadastro'
