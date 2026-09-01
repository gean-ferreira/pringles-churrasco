<script setup lang="ts">
import { FAQ_ITEMS } from '~/utils/datas/faq.data'
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'FAQ' })

useSeoMeta({
  title: 'Dúvidas Frequentes — Pringles Churrasco',
  description: 'Tire suas dúvidas sobre a promoção Pringles Churrasco.',
  ogTitle: 'Dúvidas Frequentes — Pringles Churrasco',
  ogDescription: 'Tire suas dúvidas sobre a promoção Pringles Churrasco.',
  ogUrl: `${url}/faq`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/faq` }] })

// Conteúdo fixo (decisão da campanha) — ver app/utils/datas/faq.data.ts.
const items = FAQ_ITEMS.map((item) => ({ question: item.pergunta, answer: item.resposta }))
</script>

<template>
  <section class="min-h-screen bg-(--color-brand-primary)">
    <div class="container py-14">
      <header class="mb-12">
        <h1 class="page-title text-center">Dúvidas Frequentes</h1>
      </header>
      <main class="mx-auto max-w-5xl">
        <AppAccordion :items="items" />
      </main>
    </div>
  </section>
</template>
