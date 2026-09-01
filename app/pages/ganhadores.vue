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
  <section class="min-h-screen bg-(--color-brand-primary)">
    <div class="container py-14">
      <header class="mb-12 text-center">
        <h1 class="page-title mb-2">Ganhadores</h1>
        <p class="text-body-base text-white">Confira abaixo os ganhadores da promoção</p>
      </header>
      <main class="space-y-4 xl:space-y-10">
        <SectionsWinnersInstantPrize />
        <SectionsWinnersFinalDraw />
      </main>
    </div>
  </section>
</template>
