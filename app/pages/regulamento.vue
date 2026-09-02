<script setup lang="ts">
import {
  LINK_REGULAMENTO_INSTANTANEO,
  LINK_REGULAMENTO_FINAL
} from '~/utils/links'
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'Regulamento' })

useSeoMeta({
  title: 'Regulamento — Pringles Churrasco',
  description: 'Confira o regulamento da campanha Pringles Churrasco.',
  ogTitle: 'Regulamento — Pringles Churrasco',
  ogDescription: 'Confira o regulamento da campanha Pringles Churrasco.',
  ogUrl: `${url}/regulamento`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/regulamento` }] })

const regulamentos = [
  {
    id: 1,
    title: 'Premiação instantânea',
    pdf: LINK_REGULAMENTO_INSTANTANEO,
    description:
      'Aqui você encontra todas as informações e regras da premiação instantânea (abertura da lata).'
  },
  {
    id: 2,
    title: 'Sorteio final',
    pdf: LINK_REGULAMENTO_FINAL,
    description:
      'Conheça as condições e informações importantes sobre o sorteio final.'
  }
]
</script>

<template>
  <section class="min-h-screen bg-(--color-brand-primary)">
    <div class="container py-14">
      <header class="mb-12 text-center">
        <h1 class="page-title mb-2">Regulamento</h1>
        <p class="text-body-base text-white">
          Confira abaixo o regulamento da campanha
        </p>
      </header>
      <main class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div
          v-for="item in regulamentos"
          :key="item.id"
          class="rounded-xl bg-(--color-brand-accent-purple) p-6 text-center md:py-8"
        >
          <h2 class="text-h3 mb-3 text-(--color-brand-secondary) uppercase">
            {{ item.title }}
          </h2>
          <p class="text-body-sm mx-auto mb-10 text-white">
            {{ item.description }}
          </p>
          <AppButton
            :to="item.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            class="mx-auto max-w-[294px]"
          >
            Ver regulamento
          </AppButton>
        </div>
      </main>
    </div>
  </section>
</template>
