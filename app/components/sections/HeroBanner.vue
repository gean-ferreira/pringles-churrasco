<script setup lang="ts">
import { promotionName } from '~/utils/constants/seo.constant'
</script>

<template>
  <!-- TODO: substituir por <picture> com artes mobile/desktop reais assim que o design chegar. -->
  <section class="flex min-h-[420px] items-center justify-center bg-(--color-brand-primary) text-center">
    <div class="container">
      <h1 class="page-title mb-4">{{ promotionName }}</h1>
      <p class="text-body-lg text-white">Participe e concorra a prêmios instantâneos e ao sorteio final!</p>
    </div>
  </section>
</template>
