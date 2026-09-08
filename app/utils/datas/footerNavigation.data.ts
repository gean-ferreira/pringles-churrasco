import type { LinkNavigation } from '~/types/linkNavigation'
import { LINK_REGULAMENTO } from '~/utils/links'

export const footerNavigation: LinkNavigation[] = [
  { label: 'Dúvidas', path: '/faq' },
  { label: 'Fale Conosco', path: '/fale-conosco' },
  { label: 'Regulamento', path: LINK_REGULAMENTO, external: true }
]
