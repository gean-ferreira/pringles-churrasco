<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'success' | 'accent' | 'ghost' | 'link'
type Size = 'lg' | 'md' | 'sm'
const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    to?: string
    block?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  { variant: 'primary', size: 'lg', type: 'button' }
)

const isDisabled = computed(() => props.disabled || props.loading)
// Borda + sombra deslocada "comic" (Figma: Type=Primary/Secondary/Destructive) — comum a toda variante colorida.
const comicChrome = 'comic-chrome-sm'
const variantClasses: Record<Variant, string> = {
  // Figma "Destructive": vermelho + texto branco.
  primary: `bg-(--color-brand-primary) text-white ${comicChrome} hover:brightness-95 active:brightness-90`,
  // Figma "Primary": amarelo + texto marrom.
  secondary: `bg-(--color-brand-secondary) text-(--color-brand-outline) ${comicChrome} hover:brightness-95 active:brightness-90`,
  // Figma "Secondary": verde + texto branco.
  success: `bg-(--color-brand-accent-green) text-white ${comicChrome} hover:brightness-95 active:brightness-90`,
  accent: `bg-(--color-brand-accent-purple) text-white ${comicChrome} hover:brightness-110 active:brightness-95`,
  ghost:
    'border border-(--color-brand-neutral-200) text-(--color-brand-neutral-600) hover:bg-(--color-brand-neutral-50)',
  // Figma: ação secundária em texto vermelho (ex.: "Sim, excluir meu cadastro").
  link: 'text-(--color-brand-primary) hover:underline'
}
const sizeClasses: Record<Size, string> = {
  lg: 'px-4 py-4 text-body-base xl:py-3.5',
  md: 'px-4 py-[10px] text-body-sm',
  sm: 'px-4 py-2 text-body-xs'
}

const rootClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase transition-all',
  props.variant === 'link'
    ? [
        variantClasses.link,
        'text-body-sm',
        isDisabled.value
          ? 'cursor-not-allowed opacity-60 hover:no-underline'
          : 'cursor-pointer'
      ]
    : isDisabled.value
      ? [
          'bg-(--color-brand-neutral-100) text-(--color-brand-neutral-400) cursor-not-allowed',
          'border-2 border-(--color-brand-neutral-400) drop-shadow-[-1px_3px_0px_var(--color-brand-neutral-400)]',
          props.to && 'pointer-events-none'
        ]
      : [variantClasses[props.variant], 'cursor-pointer'],
  props.variant !== 'link' && sizeClasses[props.size],
  props.block && 'w-full'
])

const rootRef = ref<{ $el: HTMLElement } | HTMLElement | null>(null)
// Permite foco programático (ex.: destacar o CTA ao entrar num step) sem
// expor todo o componente — NuxtLink só dá acesso ao <a> via $el.
defineExpose({
  focus: () => {
    const el =
      rootRef.value && '$el' in rootRef.value
        ? rootRef.value.$el
        : rootRef.value
    el?.focus()
  }
})
</script>
<template>
  <NuxtLink
    v-if="to"
    ref="rootRef"
    :to="to"
    :aria-disabled="isDisabled || undefined"
    :class="rootClasses"
  >
    <IconSpinner v-if="loading" class="size-5" />
    <slot />
  </NuxtLink>
  <button
    v-else
    ref="rootRef"
    :type="type"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :class="rootClasses"
  >
    <IconSpinner v-if="loading" class="size-5" />
    <slot />
  </button>
</template>
