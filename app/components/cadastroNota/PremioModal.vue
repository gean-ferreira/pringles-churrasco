<script setup lang="ts">
defineProps<{ open: boolean; premio: string }>()
const emit = defineEmits<{ 'update:open': [value: boolean]; resgatar: [] }>()
</script>

<template>
  <AppModal
    :open="open"
    :dismissible="false"
    :close-icon="false"
    @update:open="emit('update:open', $event)"
  >
    <!-- Margem negativa cancela o padding do AppModal (p-6 xl:p-10) pra esse
         fundo verde + padrão cobrir o card inteiro, igual aos cards de sabor
         e do PIN — sem precisar de uma prop nova no AppModal só pra isso.
         `rounded-lg` (8px) = rounded-xl do AppModal (12px) menos a borda de
         4px; com rounded-xl aqui o branco vazava nos cantos. -->
    <div class="relative -m-6 overflow-hidden rounded-lg xl:-m-10">
      <div class="absolute inset-0 bg-(--color-brand-accent-green)" />
      <div aria-hidden="true" class="card-pattern" />
      <div
        class="relative flex flex-col items-center gap-6 p-6 text-center xl:p-10"
      >
        <div class="flex flex-col gap-2">
          <p
            class="text-h2 font-bold text-(--color-brand-secondary) uppercase [text-shadow:-4px_4px_0_var(--color-brand-outline)]"
          >
            Parabéns!!
          </p>
          <p
            class="text-h2 font-bold text-white uppercase [text-shadow:-4px_4px_0_var(--color-brand-outline)]"
          >
            Hoje o churrasco é por nossa conta.
          </p>
        </div>
        <p class="text-body-sm text-white">
          Você ganhou um prêmio instantâneo de {{ premio }}.
        </p>
        <img
          src="/images/cadastro-nota-premio-ticket.png"
          alt="Ticket de prêmio Pringles"
          width="333"
          height="154"
          class="h-auto w-full max-w-[280px]"
        />
        <p class="text-body-sm text-white">
          Clique no botão abaixo para enviar a sua nota fiscal
        </p>
        <AppButton
          type="button"
          variant="secondary"
          block
          @click="emit('resgatar')"
        >
          Enviar nota fiscal
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>
