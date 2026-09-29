<script setup lang="ts">
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

const store = useNotificationModalStore()
const runningIndex = ref<number | null>(null)

// Travada durante a action: fechar não cancelaria a requisição em voo.
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
        :variant="action.variant ?? 'secondary'"
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
