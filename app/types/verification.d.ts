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

export type VerificationAction = 'login' | 'cadastro'
