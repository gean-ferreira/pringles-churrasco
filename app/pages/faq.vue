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
const items = FAQ_ITEMS.map((item) => ({
  question: item.pergunta,
  answer: item.resposta
}))
</script>

<template>
  <section
    class="relative overflow-hidden bg-(--color-brand-secondary) py-14 md:py-24"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-[url('/images/bg-pattern.png')] [background-size:1920px_1003px] bg-repeat opacity-5"
    />
    <div class="relative container flex flex-col items-center gap-14">
      <header class="flex items-center gap-3 md:gap-6">
        <IconStar class="size-4 shrink-0 text-white md:size-8" />
        <h1
          class="text-h1 text-shadow-comic text-stroke-comic md:text-h1-lg text-center text-white uppercase"
        >
          Dúvidas frequentes
        </h1>
        <IconStar class="size-4 shrink-0 text-white md:size-8" />
      </header>

      <main class="w-full max-w-[1008px]">
        <AppAccordion :items="items" />
      </main>

      <div class="flex w-full flex-col items-center gap-8">
        <h2
          class="text-h3 text-shadow-comic text-stroke-comic md:text-h2 text-center text-white uppercase"
        >
          Ainda está com dúvidas?
        </h2>
        <AppButton
          to="/fale-conosco"
          variant="success"
          block
          class="max-w-[384px]"
          >Fale conosco</AppButton
        >
      </div>
    </div>
  </section>
</template>
