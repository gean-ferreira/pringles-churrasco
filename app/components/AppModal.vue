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
            class="comic-chrome-lg relative flex w-full flex-col gap-2 rounded-xl bg-white p-6 xl:p-10"
            :style="{ maxWidth }"
            role="dialog"
            aria-modal="true"
          >
            <button
              v-if="closeIcon"
              type="button"
              class="comic-chrome-sm absolute -top-7 -right-[9px] flex size-12 cursor-pointer items-center justify-center rounded-xl bg-(--color-brand-secondary) text-(--color-brand-outline) transition-all hover:brightness-95 active:brightness-90"
              aria-label="Fechar"
              @click="close"
            >
              <IconClose class="size-6" />
            </button>
            <div class="flex flex-col gap-6">
              <div
                v-if="title || description"
                class="flex flex-col gap-2 text-center"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <h2
                  v-if="title"
                  class="text-h3 text-shadow-comic text-stroke-comic xl:text-h2 font-bold text-(--color-brand-secondary) uppercase"
                  v-html="title"
                />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p
                  v-if="description"
                  class="text-body-sm whitespace-pre-line text-(--color-brand-neutral-800)"
                  v-html="description"
                />
              </div>
              <slot />
              <div v-if="$slots.actions" class="flex flex-col gap-2">
                <slot name="actions" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
