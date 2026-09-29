<script setup lang="ts">
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'Ganhadores' })

useSeoMeta({
  title: 'Ganhadores — Pringles Churrasco',
  description: 'Confira os ganhadores da promoção Pringles Churrasco.',
  ogTitle: 'Ganhadores — Pringles Churrasco',
  ogDescription: 'Confira os ganhadores da promoção Pringles Churrasco.',
  ogUrl: `${url}/ganhadores`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/ganhadores` }] })
</script>

<template>
  <section
    class="relative overflow-hidden bg-(--color-brand-accent-green) pt-14 md:pt-25"
  >
    <AppBgPattern />
    <div class="relative container flex flex-col items-center gap-10">
      <header class="flex flex-col items-center gap-2 text-center">
        <h1
          class="text-h2 text-shadow-comic text-stroke-comic xl:text-h1 text-(--color-brand-secondary) uppercase"
        >
          Ganhadores
        </h1>
        <p class="text-body-base font-bold text-white">
          Confira abaixo os ganhadores da promoção
        </p>
      </header>

      <div
        class="flex w-full max-w-[1216px] flex-col gap-8 pb-14 xl:gap-10 xl:pb-25"
      >
        <SectionsWinnersInstantPrize />
      </div>
    </div>

    <AppInfiniteMarquee />
  </section>
</template>
