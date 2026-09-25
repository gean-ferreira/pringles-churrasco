<script setup lang="ts">
import { promotionName } from '~/utils/constants/seo.constant'
</script>

<template>
  <section class="relative bg-(--color-brand-primary)">
    <h1 class="sr-only">{{ promotionName }}</h1>
    <picture>
      <source
        media="(min-width: 768px)"
        srcset="/images/home-hero-desktop.png"
        width="1920"
        height="768"
      />
      <img
        src="/images/home-hero-mobile.jpg"
        alt="Promoção Churras Original é com Pringles: prêmios de R$ 500 toda hora para deixar seu churrasco completo do jeito BR"
        width="750"
        height="1240"
        fetchpriority="high"
        class="block h-auto w-full"
      />
    </picture>
  </section>
</template>
