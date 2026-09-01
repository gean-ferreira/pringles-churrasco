<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'accent' | 'ghost'
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
const variantClasses: Record<Variant, string> = {
  primary:
    'bg-(--color-brand-primary) text-white hover:bg-(--color-brand-primary-dark) active:bg-(--color-brand-primary-dark)',
  secondary:
    'bg-(--color-brand-secondary) text-(--color-brand-primary) hover:brightness-95 active:brightness-90',
  accent:
    'bg-(--color-brand-accent-purple) text-white hover:brightness-110 active:brightness-95',
  ghost:
    'border border-(--color-brand-neutral-200) text-(--color-brand-neutral-600) hover:bg-(--color-brand-neutral-50)'
}
const sizeClasses: Record<Size, string> = {
  lg: 'px-4 py-4 text-body-base',
  md: 'px-4 py-[10px] text-body-sm',
  sm: 'px-4 py-2 text-body-xs'
}

const rootClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase transition-all',
  isDisabled.value
    ? [
        'bg-(--color-brand-neutral-100) text-(--color-brand-neutral-400) cursor-not-allowed',
        props.to && 'pointer-events-none'
      ]
    : [variantClasses[props.variant], 'cursor-pointer'],
  sizeClasses[props.size],
  props.block && 'w-full'
])
</script>
<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-disabled="isDisabled || undefined"
    :class="rootClasses"
  >
    <IconSpinner v-if="loading" class="size-5" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :class="rootClasses"
  >
    <IconSpinner v-if="loading" class="size-5" />
    <slot />
  </button>
</template>
