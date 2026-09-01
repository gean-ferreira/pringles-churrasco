<script setup lang="ts">
const props = defineProps<{
  to: string
  external?: boolean
  // Força o estado ativo. Usado por links de âncora, cuja seção visível é
  // resolvida por quem chama (useActiveSection). Omitido → estado vem da rota.
  active?: boolean
}>()

const route = useRoute()
const isAnchor = computed(() => props.to.includes('#'))

const isActive = computed(() => {
  if (props.active !== undefined) return props.active
  if (props.external || isAnchor.value) return false
  return route.path === props.to
})

// Âncora aponta para posição dentro da página aberta → aria-current="location".
// `page` diria ao leitor de tela que o usuário está em outra rota.
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
    class="text-body-base font-medium transition-colors"
    :class="isActive ? 'text-(--color-brand-secondary)' : 'text-white'"
  ><slot /></NuxtLink>
</template>
