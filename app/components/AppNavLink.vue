<script setup lang="ts">
const props = defineProps<{
  to: string
  external?: boolean
  // Omitido → estado ativo vem da rota.
  active?: boolean
}>()

const route = useRoute()
const isAnchor = computed(() => props.to.includes('#'))

const isActive = computed(() => {
  if (props.active !== undefined) return props.active
  if (props.external || isAnchor.value) return false
  return route.path === props.to
})

// Âncora é posição na página atual: `location`, não `page`.
const ariaCurrent = computed(() => {
  if (!isActive.value) return undefined
  return isAnchor.value ? 'location' : 'page'
})
</script>
<template>
  <NuxtLink
    :to="to"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-current="ariaCurrent"
    class="text-body-sm font-bold uppercase transition-colors hover:text-(--color-brand-secondary)"
    :class="isActive ? 'text-(--color-brand-secondary)' : 'text-white'"
    ><slot
  /></NuxtLink>
</template>
