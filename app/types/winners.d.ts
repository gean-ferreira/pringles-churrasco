// GET /Winner/List?winnerType={1 = VB | 2 = SORTEIO}
export interface WinnerResponse<T> {
  title: string
  message: string
  responseDto: T[]
}

export interface InstantPrizeWinner {
  // Iniciais do ganhador (ex.: "J.S")
  name: string
  prizeDescription: string
  createDate: string
}
