import type { Flavor } from '~/types/flavor'

export const NOVOS_SABORES_DATA: Flavor[] = [
  {
    id: 1,
    slug: 'picanha-no-alho',
    name: 'Picanha',
    subtitle: 'No alho',
    description:
      'Se o churras brasileiro tem várias estrelas, a picanha com certeza é uma delas. E quando ela chega assim, na lata junto com o alho, esquece! Um sabor único assim que você der um POP.',
    image: '/images/novos-sabores-picanha.png',
    imageWidth: 140,
    imageHeight: 417
  },
  {
    id: 2,
    slug: 'costela-na-brasa',
    name: 'Costela',
    subtitle: 'Na brasa',
    description:
      'Imagina todo aquele sabor de uma costela defumada por 12 horas à sua disposição assim que você abrir a lata! É a experiência perfeita da brasa levando o sabor lentamente para o ponto perfeito.',
    image: '/images/novos-sabores-costela.png',
    imageWidth: 140,
    imageHeight: 417
  },
  {
    id: 3,
    slug: 'linguica-com-vinagrete',
    name: 'Linguiça',
    subtitle: 'Com vinagrete',
    description:
      'Pode fazer churrasco do seu jeito, mas o churras BR de verdade tem que ter uma linguicinha para começar os trabalhos. Fala se não é a combinação perfeita: linguiça grelhada, um toque de vinagrete e a praticidade de ter esse sabor todo na sua lata de Pringles.',
    image: '/images/novos-sabores-linguica.png',
    imageWidth: 140,
    imageHeight: 417
  }
]
