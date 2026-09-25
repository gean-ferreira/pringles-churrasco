<script setup lang="ts">
import { usePromotionStatus } from '~/composables/usePromotionStatus'
import { useMobileBarOffset } from '~/composables/useMobileBarOffset'

const { isLoggedIn } = useAuth()
const { isPromotionFinished } = usePromotionStatus()

// Deslogado -> /cadastro, logado -> /cadastro-nota; ambos gated pelo check-promotion.
const ctaTo = computed(() =>
  isLoggedIn.value ? '/cadastro-nota' : '/cadastro'
)

const barraRef = ref<HTMLElement | null>(null)

useMobileBarOffset(barraRef)
</script>

<template>
  <!--
    z-30: abaixo do header (z-50) e do menu mobile (z-40), que precisam cobrir
    a barra quando abertos; acima do conteúdo da página.
  -->
  <div
    v-if="!isPromotionFinished"
    ref="barraRef"
    class="animate-slide-up fixed inset-x-0 bottom-0 z-30 flex flex-col items-start gap-2 bg-(--color-brand-accent-green) px-4 py-6 motion-reduce:animate-none xl:hidden"
  >
    <AppButton :to="ctaTo" variant="secondary" block>Participe agora</AppButton>
  </div>
</template>
