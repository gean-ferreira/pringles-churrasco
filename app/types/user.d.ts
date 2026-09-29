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

// Contrato de `content` em GET /User/Get (birthDate já vem em dd/MM/yyyy).
export interface ApiUser {
  id: number
  cpf: string
  name: string
  lastName: string
  birthDate: string
  phoneNumber: string
  email: string
  uf: string
  termsAndConditions: boolean
  privacyPolicy: boolean
  acceptsMarketingEmails: boolean
}
