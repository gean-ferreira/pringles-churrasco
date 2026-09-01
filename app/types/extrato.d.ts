export type ParticipacaoStatus = 'REPROVADO' | 'APROVADO' | 'EM ANÁLISE'

export interface Participacao {
  dataCadastro: string
  pincode: string
  status: ParticipacaoStatus
  premio: string
  motivo?: string
  imagemUrl?: string
}

export interface NumeroSorte {
  dataCadastro: string
  pincode: string
  numeroSorte: string
  motivo?: string
  imagemUrl?: string
}

export interface ExtratoDto {
  participacoes: Participacao[]
  numerosSorte: NumeroSorte[]
}

export interface GetExtratoResponse {
  mensagem: string
  extratoCupomDto: ExtratoDto
}
