<script setup lang="ts">
import { PRIZES_DATA } from '~/utils/datas/prizes.data'
import { useAuthStore } from '~/stores/auth.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'
import type { Prize } from '~/types/rewards'

const authStore = useAuthStore()
const { isPromotionFinished } = usePromotionStatus()

const isModalOpen = ref(false)
const selectedPrize = ref<Prize | null>(null)

function openPrizeModal(prize: Prize) {
  selectedPrize.value = prize
  isModalOpen.value = true
}
function closePrizeModal() {
  isModalOpen.value = false
}
</script>

<template>
  <section id="premios" class="bg-(--color-brand-primary)">
    <div class="container py-14 xl:py-25">
      <h2 class="page-title mb-10 text-center xl:mb-12">
        São mais de 100 itens toda semana!
      </h2>
      <div
        class="mx-auto mb-12 grid max-w-[1216px] grid-cols-1 place-items-center gap-y-10 md:grid-cols-2 md:gap-x-10 xl:mb-25 xl:grid-cols-4 xl:gap-8"
      >
        <div
          v-for="item in PRIZES_DATA"
          :key="item.title"
          class="w-full max-w-[280px] text-center"
        >
          <div
            class="text-body-sm mb-4 flex aspect-square items-center justify-center rounded-xl bg-white text-(--color-brand-neutral-400)"
          >
            {{ item.title }}
          </div>
          <h3 class="text-body-lg mb-2 font-bold text-white uppercase">
            {{ item.title }}
          </h3>
          <p class="text-body-sm mb-4 text-white">{{ item.descriptionCard }}</p>
          <button
            type="button"
            class="text-body-sm text-white uppercase hover:underline"
            @click="openPrizeModal(item)"
          >
            Ver detalhes
          </button>
        </div>
      </div>
      <ClientOnly>
        <AppButton
          v-if="!isPromotionFinished"
          :to="authStore.isAuthenticated ? '/cadastro-nota' : '/cadastro'"
          variant="accent"
          block
          class="mx-auto max-w-[384px]"
        >
          Participe agora mesmo
        </AppButton>
      </ClientOnly>
    </div>

    <AppModal :open="isModalOpen" @close="closePrizeModal">
      <template v-if="selectedPrize">
        <h2
          class="text-h3 font-bold text-(--color-brand-accent-purple) uppercase"
        >
          {{ selectedPrize.modalTitle }}
        </h2>
        <p
          class="text-body-sm mb-2 font-bold text-(--color-brand-neutral-700) uppercase"
        >
          Descrição
        </p>
        <p class="text-body-sm mb-4 text-(--color-brand-neutral-700)">
          {{ selectedPrize.descriptionModal }}
        </p>
        <p
          class="text-body-sm mb-2 font-bold text-(--color-brand-neutral-700) uppercase"
        >
          Mais detalhes
        </p>
        <ul
          class="text-body-sm list-inside list-disc text-(--color-brand-neutral-700)"
        >
          <li v-for="detail in selectedPrize.details" :key="detail">
            {{ detail }}
          </li>
        </ul>
      </template>
    </AppModal>
  </section>
</template>
