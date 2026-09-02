<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'

const authStore = useAuthStore()
const { isPromotionFinished } = usePromotionStatus()

const steps = [
  {
    title: '1. Compre',
    description: 'Compre um produto participante Pringles Churrasco.'
  },
  {
    title: '2. Cadastre',
    description: 'Cadastre seu código e envie a nota fiscal.'
  },
  {
    title: '3. Abra a lata',
    description:
      'Abra sua Pringles e descubra na hora se ganhou um prêmio instantâneo.'
  },
  { title: '4. Concorra', description: 'Fique de olho no sorteio final.' }
]
</script>

<template>
  <section id="como-participar" class="bg-(--color-brand-primary-dark)">
    <div class="container py-14 lg:py-18">
      <h2 class="page-title mb-10 text-center xl:mb-14">
        Como participar da promoção
      </h2>
      <div
        class="mx-auto grid max-w-[1216px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
      >
        <div
          v-for="step in steps"
          :key="step.title"
          class="rounded-xl bg-white p-6 text-center"
        >
          <p class="text-h3 font-bold text-(--color-brand-primary)">
            {{ step.title }}
          </p>
          <p class="text-body-sm mt-2 text-(--color-brand-neutral-700)">
            {{ step.description }}
          </p>
        </div>
      </div>
      <ClientOnly>
        <AppButton
          v-if="!isPromotionFinished"
          :to="authStore.isAuthenticated ? '/cadastro-nota' : '/cadastro'"
          variant="accent"
          block
          class="mx-auto mt-14 max-w-[384px]"
        >
          Participe já!
        </AppButton>
      </ClientOnly>
    </div>
  </section>
</template>
