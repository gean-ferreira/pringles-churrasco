<script setup lang="ts">
const props = defineProps<{ status: string }>()

// Casa pela raiz do texto: independe de gênero, acento e caixa.
const statusClass: Record<string, string> = {
  aprova: 'bg-(--color-feedback-green-50) text-(--color-feedback-green-700)',
  analise: 'bg-(--color-feedback-yellow-50) text-(--color-feedback-yellow-700)',
  reprova: 'bg-(--color-feedback-red-50) text-(--color-feedback-red-700)'
}

const badgeClass = computed(() => {
  const normalized = props.status
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
  const key = Object.keys(statusClass).find((k) => normalized.includes(k))
  return key
    ? statusClass[key]
    : 'bg-(--color-brand-neutral-50) text-(--color-brand-neutral-700)'
})
</script>
<template>
  <span
    class="text-body-sm inline-flex items-center rounded px-2 py-0.5 font-medium"
    :class="badgeClass"
  >
    {{ status }}
  </span>
</template>
