<script setup lang="ts">
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

const store = useNotificationModalStore()
const runningIndex = ref<number | null>(null)

// Enquanto uma action assíncrona está em voo, a modal fica totalmente
// intravável (sem X, ESC ou clique no overlay) — fechar visualmente não
// cancela a requisição, e travar evita uma UI órfã no meio de uma ação real.
const isLocked = computed(() => runningIndex.value !== null)

async function runAction(index: number) {
  const action = store.actions[index]
  if (!action) return
  if (!action.handler) {
    store.closeModal()
    return
  }
  runningIndex.value = index
  try {
    await action.handler()
  } finally {
    runningIndex.value = null
  }
}

</script>

<template>
  <AppModal
    :open="store.isOpen"
    :title="store.title"
    :description="store.description"
    :dismissible="store.dismissible && !isLocked"
    :close-icon="store.closeIcon && !isLocked"
    @update:open="(value) => !value && store.closeModal()"
  >
    <template #actions>
      <AppButton
        v-for="(action, index) in store.actions"
        :key="action.label"
        :variant="action.variant === 'ghost' ? 'ghost' : action.variant === 'secondary' ? 'secondary' : 'primary'"
        block
        :loading="runningIndex === index"
        :disabled="isLocked && runningIndex !== index"
        @click="runAction(index)"
      >
        {{ action.label }}
      </AppButton>
    </template>
  </AppModal>
</template>
