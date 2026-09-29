export type ParticipacaoStatus = 'REPROVADO' | 'APROVADO' | 'EM ANÁLISE'

export interface Participacao {
  dataCadastro: string
  pincode: string
  status: ParticipacaoStatus
  premio: string
  motivo?: string
}

// Item de `content.extract` em GET /User/GetExtract. `status` é o id do
// StatusEnum (1 EM_ANALISE, 2 APROVADO_AUTO, 3 REPROVADO_AUTO, 4 APROVADO,
// 5 REPROVADO); `createdAt` já vem em dd/MM/yyyy.
export interface ApiExtractItem {
  createdAt: string
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
    // Sempre vazio nesta promoção (sem distribuição de números da sorte).
    luckyNumbers: unknown[]
  }
}
