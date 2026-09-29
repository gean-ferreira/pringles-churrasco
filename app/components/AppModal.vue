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

const titleId = useId()
const descriptionId = useId()
const dialogRef = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null

// Com a app `inert`, o Tab e o leitor de tela não saem do modal.
function setAppInert(value: boolean) {
  openModals += value ? 1 : -1
  const app = document.getElementById('__nuxt')
  if (app) app.inert = openModals > 0
}

watch(
  () => props.open,
  async (open, wasOpen) => {
    if (!import.meta.client || open === !!wasOpen) return
    setAppInert(open)
    if (open) {
      previousFocus = document.activeElement as HTMLElement | null
      await nextTick()
      dialogRef.value?.focus()
    } else if (previousFocus?.isConnected) {
      previousFocus.focus()
      previousFocus = null
    }
  },
  { immediate: true }
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (props.open) setAppInert(false)
})
</script>

<script lang="ts">
// Compartilhado entre instâncias: com modais empilhados, a app só volta
// a ser interativa quando o último fecha.
let openModals = 0
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
            ref="dialogRef"
            class="comic-chrome-lg relative flex w-full flex-col gap-2 rounded-xl bg-white p-6 outline-none xl:p-10"
            :style="{ maxWidth }"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? titleId : undefined"
            :aria-describedby="description ? descriptionId : undefined"
            tabindex="-1"
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
                  :id="titleId"
                  class="text-h3 text-shadow-comic text-stroke-comic xl:text-h2 font-bold text-(--color-brand-secondary) uppercase"
                  v-html="title"
                />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p
                  v-if="description"
                  :id="descriptionId"
                  class="text-body-sm whitespace-pre-line text-(--color-brand-neutral-800)"
                  v-html="description"
                />
              </div>
              <slot />
              <div v-if="$slots.actions" class="flex flex-col gap-6">
                <slot name="actions" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
