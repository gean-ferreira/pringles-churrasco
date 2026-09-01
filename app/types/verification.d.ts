export interface VerificationMascaras {
  mascara: string
  tempoExpiracao: number
  token: string
}

export type VerificationAction = 'login' | 'cadastro'
