export type ParticipacaoStatus = 'REPROVADO' | 'APROVADO' | 'EM ANÁLISE'

export interface Participacao {
  dataCadastro: string
  pincode: string
  status: ParticipacaoStatus
  premio: string
  motivo?: string
}

export interface ApiExtractItem {
  createdAt: string // dd/MM/yyyy
  pinCode: string
  instantWin: string
  status: number
  rejectionReason: string | null
}

export interface GetExtractResponse {
  title: string
  message: string
  content: {
    extract: ApiExtractItem[]
    luckyNumbers: unknown[]
  }
}
