<script setup lang="ts">
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'Novos Sabores' })

useSeoMeta({
  title: 'Novos Sabores — Pringles Churrasco',
  description: 'Conheça os novos sabores Pringles que participam da promoção.',
  ogTitle: 'Novos Sabores — Pringles Churrasco',
  ogDescription:
    'Conheça os novos sabores Pringles que participam da promoção.',
  ogUrl: `${url}/novos-sabores`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/novos-sabores` }] })

// TODO: conteúdo real (imagens/descrição dos novos sabores) pendente do design desta página no Figma.
</script>

<template>
  <section class="min-h-screen bg-(--color-brand-primary)">
    <div class="container py-14">
      <header class="mb-12 text-center">
        <h1 class="page-title mb-2">Novos Sabores</h1>
        <p class="text-body-base text-white">
          Conheça os novos sabores Pringles que participam da promoção
        </p>
      </header>
      <main class="text-body-base text-center text-white">
        <!-- TODO: grid/carrossel dos novos sabores — pendente do design desta página. -->
      </main>
    </div>
  </section>
</template>
