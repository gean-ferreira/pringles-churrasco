export interface WinnerResponse<T> {
  ganhadores: T[]
}

export interface InstantPrizeWinner {
  nome: string
  pincode: string
  premio: string
}

export interface FinalDrawWinner {
  nome: string
  local: string
  numeroSorteado: string
  premio: string
}
