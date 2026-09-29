import type { LinkNavigation } from '~/types/linkNavigation'

// "Ganhadores" e "Novos Sabores" mudam de posição conforme o login, então o
// Header.vue os renderiza fora deste array.
export const headerNavigation: LinkNavigation[] = [
  { label: 'Como participar', path: '/#como-participar' },
  { label: 'Prêmios', path: '/#premios' },
  { label: 'Produtos', path: '/#produtos' }
]
