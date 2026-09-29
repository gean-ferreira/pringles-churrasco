export interface User {
  id: number
  cpf: string
  nome: string
  sobrenome: string
  telefone: string
  email: string
  dt_nascimento: string
  estado: string
  aceite_Politica: boolean
  aceite_Regulamento: boolean
  aceite_Novidades: boolean
}

export interface ApiUser {
  id: number
  cpf: string
  name: string
  lastName: string
  birthDate: string // dd/MM/yyyy
  phoneNumber: string
  email: string
  uf: string
  termsAndConditions: boolean
  privacyPolicy: boolean
  acceptsMarketingEmails: boolean
}
