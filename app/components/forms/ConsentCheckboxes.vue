<script setup lang="ts">
import { LINK_REGULAMENTO, LINK_POLITICA_PRIVACIDADE } from '~/utils/links'

withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    showNewsletter?: boolean
  }>(),
  { disabled: false, loading: false, showNewsletter: false }
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <AppCheckbox
      name="aceite_Regulamento"
      :disabled="disabled"
      :loading="loading"
    >
      Li e aceito o
      <a
        :href="LINK_REGULAMENTO"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-(--color-brand-primary) hover:underline"
        >Regulamento</a
      >.
    </AppCheckbox>
    <AppCheckbox name="aceite_Politica" :disabled="disabled" :loading="loading">
      Li e entendi o
      <a
        :href="LINK_POLITICA_PRIVACIDADE"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-(--color-brand-primary) hover:underline"
        >Aviso de Privacidade</a
      >.
    </AppCheckbox>
    <AppCheckbox v-if="showNewsletter" name="aceite_Novidades">
      Aceito receber e-mails com novidades e informações sobre a promoção.
    </AppCheckbox>
  </div>
</template>
