<script setup lang="ts">
import { NOVOS_SABORES_DATA } from '~/utils/datas/novosSabores.data'
</script>

<template>
  <section
    id="produtos"
    class="relative overflow-hidden bg-(--color-brand-outline-light) bg-[url('/images/novos-sabores-kv-bg.jpg')] bg-cover bg-center"
  >
    <AppBgPattern :opacity="40" />

    <div
      class="relative container flex flex-col items-center gap-10 py-14 xl:gap-18 xl:py-25"
    >
      <h2
        class="text-shadow-comic flex flex-col items-center text-center font-bold uppercase"
      >
        <span class="text-h3 xl:text-h2 flex items-center gap-2 text-white">
          <IconStar class="size-4 shrink-0 xl:size-6" />
          Compre
          <IconStar class="size-4 shrink-0 xl:size-6" />
        </span>
        <span class="text-h3 xl:text-h1-lg text-(--color-brand-secondary)">
          Os sabores Pringles<sup>®</sup><br />
          Churras BR
        </span>
      </h2>

      <!-- Mesmo scroll-snap no eixo x da votação de sabores (StepVotacao); no
           xl os 3 cards (1202px) usam também o gutter do container. -->
      <div
        class="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 xl:-mx-4 xl:w-[calc(100%+2rem)] xl:justify-center xl:overflow-visible xl:pb-0"
      >
        <ProdutosCard
          v-for="flavor in NOVOS_SABORES_DATA"
          :key="flavor.slug"
          :flavor="flavor"
        />
      </div>

      <AppButton
        to="/novos-sabores"
        variant="secondary"
        block
        class="max-w-[384px]"
      >
        Conhecer sabores
      </AppButton>
    </div>
  </section>
</template>
