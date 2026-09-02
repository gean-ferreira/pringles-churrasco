<script setup lang="ts">
const props = withDefaults(defineProps<{ variant?: 'warning' | 'error' }>(), {
  variant: 'warning'
})

const rootClasses = computed(() =>
  props.variant === 'error'
    ? 'bg-(--color-feedback-red-50) border-(--color-feedback-red-100)'
    : 'bg-(--color-feedback-yellow-50) border-(--color-feedback-yellow-100)'
)

const iconClasses = computed(() =>
  props.variant === 'error'
    ? 'text-(--color-feedback-red-500)'
    : 'text-(--color-feedback-yellow-600)'
)
</script>
<template>
  <div
    class="flex items-center gap-2 rounded-lg border px-2 py-3"
    :class="rootClasses"
    role="alert"
  >
    <IconWarning class="size-6 shrink-0" :class="iconClasses" />
    <p class="text-body-sm text-(--color-brand-neutral-950)"><slot /></p>
  </div>
</template>
