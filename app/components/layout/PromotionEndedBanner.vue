<script setup lang="ts">
import { usePromotionStatus } from '~/composables/usePromotionStatus'

const { isPromotionFinished, bannerHeight } = usePromotionStatus()
const bannerRef = ref<HTMLElement | null>(null)

// Mede a altura real renderizada (a mensagem pode quebrar em 2 linhas em telas
// estreitas) e publica ela de duas formas: como CSS var (layout padding-top +
// scroll-padding-top) e no store (bannerHeight), para o rootMargin do
// IntersectionObserver de useActiveSection, que não lê CSS vars.
onMounted(() => {
  const updateOffset = () => {
    const height = bannerRef.value?.offsetHeight ?? 0
    bannerHeight.value = height
    document.documentElement.style.setProperty(
      '--promo-banner-height',
      `${height}px`
    )
  }

  const resizeObserver = new ResizeObserver(updateOffset)

  watch(
    bannerRef,
    (el, oldEl) => {
      if (oldEl) resizeObserver.unobserve(oldEl)
      if (el) resizeObserver.observe(el)
      updateOffset()
    },
    { immediate: true }
  )

  onUnmounted(() => resizeObserver.disconnect())
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div
      v-if="isPromotionFinished"
      ref="bannerRef"
      role="alert"
      class="fixed inset-x-0 top-(--header-height) z-30 bg-(--color-feedback-red-500) px-4 py-4 text-center"
    >
      <p class="text-body-lg font-bold text-white uppercase">
        O período de participação foi encerrado.
      </p>
    </div>
  </Transition>
</template>
