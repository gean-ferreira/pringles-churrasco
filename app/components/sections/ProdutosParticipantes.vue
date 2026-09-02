<script setup lang="ts">
import { PRODUCTS_DATA } from '~/utils/datas/products.data'

// Decisão da campanha: seção sem carrossel (grid estático), diferente da
// variante padrão "home section (carousel)" da skill — ver SKILL.md, Campaign Config.
</script>

<template>
  <section id="produtos" class="bg-(--color-brand-accent-purple)">
    <div class="container py-14 xl:py-25">
      <header class="mb-10 xl:mb-12">
        <h2 class="page-title mb-6 text-center">Produtos participantes</h2>
        <p class="text-body-lg text-center text-white">
          <strong class="block text-(--color-brand-secondary)">
            Atenção: todos os produtos que possuem o código estão participando
            da promoção.
          </strong>
          Então fique atento no lacre da embalagem e boa sorte!
        </p>
      </header>
      <div class="mx-auto grid max-w-[1216px] grid-cols-2 gap-4 md:grid-cols-4">
        <div
          v-for="product in PRODUCTS_DATA"
          :key="product.title"
          class="flex h-[220px] flex-col items-center justify-end gap-2 rounded-xl bg-white p-4"
        >
          <div
            class="text-body-xs flex flex-1 items-center justify-center text-(--color-brand-neutral-400)"
          >
            {{ product.title }}
          </div>
          <h3
            class="text-body-sm text-center font-medium text-(--color-brand-neutral-700)"
          >
            {{ product.title }}
          </h3>
        </div>
      </div>
      <AppButton
        to="/novos-sabores"
        variant="secondary"
        class="mx-auto mt-10 max-w-[294px]"
      >
        Conheça os novos sabores
      </AppButton>
    </div>
  </section>
</template>
