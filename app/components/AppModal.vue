<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    closeIcon?: boolean
    dismissible?: boolean
    maxWidth?: string
  }>(),
  { closeIcon: true, dismissible: true, maxWidth: '592px' }
)

const emit = defineEmits<{ 'update:open': [value: boolean]; close: [] }>()

function close() {
  emit('update:open', false)
  emit('close')
}
function onOverlayClick() {
  if (props.dismissible) close()
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open && props.dismissible) close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="onOverlayClick"
      >
        <Transition
          appear
          appear-active-class="transition duration-200 ease-out"
          appear-from-class="opacity-0 scale-90"
          appear-to-class="opacity-100 scale-100"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
        >
          <div
            v-if="open"
            class="relative flex w-full flex-col gap-2 rounded-lg bg-white p-6 shadow-xl"
            :style="{ maxWidth }"
            role="dialog"
            aria-modal="true"
          >
            <button
              v-if="closeIcon"
              type="button"
              class="cursor-pointer self-end text-(--color-brand-neutral-600) transition-colors hover:text-(--color-brand-neutral-950)"
              aria-label="Fechar"
              @click="close"
            >
              <IconClose class="size-[18px]" />
            </button>
            <div class="flex flex-col gap-6">
              <div v-if="title || description" class="flex flex-col gap-2 text-center">
                <h2 v-if="title" class="text-h2 font-bold text-(--color-brand-primary)">
                  {{ title }}
                </h2>
                <!-- description só recebe texto fixo do código, nunca input do usuário. -->
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p
                  v-if="description"
                  class="whitespace-pre-line text-body-base text-(--color-brand-neutral-600)"
                  v-html="description"
                />
              </div>
              <slot />
              <div v-if="$slots.actions" class="flex flex-col gap-2"><slot name="actions" /></div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
