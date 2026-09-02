import type { LinkNavigation } from '~/types/linkNavigation'

// "Ganhadores" e "Novos Sabores" ficam fora deste array: no Figma
// "Novos Sabores" muda de posição conforme o login (antes de "Ganhadores"
// deslogado, depois logado) e "Ganhadores" vem sempre depois de
// "Cadastrar PIN Code" (item só visível logado) — o Header.vue os
// renderiza como itens estáticos/condicionais nessas posições.
export const headerNavigation: LinkNavigation[] = [
  { label: 'Como participar', path: '/#como-participar' },
  { label: 'Prêmios', path: '/#premios' },
  { label: 'Produtos', path: '/#produtos' }
]
