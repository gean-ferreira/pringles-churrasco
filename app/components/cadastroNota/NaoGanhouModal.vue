<script setup lang="ts">
// Figma (nó 9874:27990): modal "não ganhou prêmio" — sem X nem clique fora,
// a única saída é o botão pro extrato.
defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()
</script>

<template>
  <AppModal
    :open="open"
    :dismissible="false"
    :close-icon="false"
    title="Poxa,<br />não foi dessa vez!"
    description="Não se preocupe, você ainda tem chance de ganhar, é só cadastrar um novo pin code. Clique no botão abaixo para conferir seu número da sorte. Boa sorte!"
    @update:open="emit('update:open', $event)"
  >
    <template #actions>
      <AppButton variant="secondary" to="/extrato" block>
        Ir para extrato
      </AppButton>
    </template>
  </AppModal>
</template>
