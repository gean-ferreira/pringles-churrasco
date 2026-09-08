export interface WinnerResponse<T> {
  ganhadores: T[]
}

export interface InstantPrizeWinner {
  nome: string
  pincode: string
  premio: string
}
