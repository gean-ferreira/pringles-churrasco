<script setup lang="ts">
import type { Participacao } from '~/types/extrato'
import { formatDate } from '~/utils/functions/date.function'

defineProps<{ open: boolean; participacao: Participacao | null }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function close() {
  emit('update:open', false)
}
</script>

<template>
  <AppModal :open="open" title="Detalhes do status" @update:open="close">
    <template v-if="participacao">
      <img
        v-if="participacao.imagemUrl"
        :src="participacao.imagemUrl"
        alt="Imagem do cupom enviado"
        class="max-h-[450px] w-full rounded-lg object-contain"
      />
      <div class="flex flex-col items-start gap-2 text-left">
        <p class="text-body-base font-bold text-(--color-feedback-red-700)">
          Rejeitado pela moderação
        </p>
        <p class="text-body-sm font-bold text-(--color-brand-neutral-800)">
          Motivo: {{ participacao.motivo ?? '-' }}
        </p>
        <p class="text-body-sm font-bold text-(--color-brand-neutral-800)">
          Nota enviada em: {{ formatDate(participacao.dataCadastro) }}
        </p>
      </div>
    </template>
  </AppModal>
</template>
