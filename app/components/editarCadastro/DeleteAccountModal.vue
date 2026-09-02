<script setup lang="ts">
import { useLogout } from '~/composables/useLogout'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { logout } = useLogout()
const notificationModalStore = useNotificationModalStore()
const deleting = ref(false)

function close() {
  emit('update:open', false)
}

async function handleDelete() {
  deleting.value = true
  try {
    await useFetchData('/Usuario/ExcluirConta', {
      method: 'GET',
      requiresAuth: true
    })
    // Ação destrutiva: desloga (limpa stores + sai da rota autenticada) ANTES
    // do aviso — a conta já não existe no back, ver SKILL.md 3.13.
    await logout()
    notificationModalStore.openModal({
      title: 'Conta excluída!',
      description:
        'Todos os seus dados foram excluídos da nossa base e você não está mais participando da promoção.',
      actions: [{ label: 'OK' }]
    })
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <AppModal
    :open="props.open"
    title="Tem certeza?"
    :dismissible="!deleting"
    @update:open="close"
  >
    <p class="text-body-base text-center text-(--color-brand-neutral-700)">
      Ao excluir o seu perfil você deixará de participar da promoção e todas as
      suas informações serão deletadas da nossa base definitivamente.
    </p>
    <template #actions>
      <AppButton
        variant="ghost"
        block
        :loading="deleting"
        @click="handleDelete"
      >
        {{ deleting ? 'Excluindo...' : 'Sim, excluir meu cadastro' }}
      </AppButton>
      <AppButton variant="secondary" block :disabled="deleting" @click="close"
        >Continuar na promoção</AppButton
      >
    </template>
  </AppModal>
</template>
