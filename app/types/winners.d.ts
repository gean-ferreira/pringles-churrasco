export interface WinnerResponse<T> {
  title: string
  message: string
  responseDto: T[]
}

export interface InstantPrizeWinner {
  name: string
  prizeDescription: string
  createDate: string
}
