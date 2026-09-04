<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { codeVerificationSchema } from '~/schemas/codeVerification'
import { MASK_CODE } from '~/utils/masks'
import { useFetchData } from '~/composables/useFetchData'
import { useAsyncSubmit } from '~/composables/useAsyncSubmit'
import { toFormData } from '~/utils/functions/formData.function'

const props = defineProps<{ open: boolean; mask: string; token: string }>()
const emit = defineEmits<{ 'update:open': [value: boolean]; deleted: [] }>()

const { onInvalidSubmit } = useFormError()
const { loading: deleting, run } = useAsyncSubmit()

function close() {
  emit('update:open', false)
}

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = { Codigo: values.codigo, Token: props.token }

    // TODO: confirmar com o backend método/rota — hoje /Usuario/ExcluirConta
    // é GET e sem verificação de código; o Figma exige o passo de código antes
    // da exclusão, então assumimos DELETE + payload até confirmação.
    await useFetchData('/Usuario/ExcluirConta', {
      method: 'DELETE',
      requiresAuth: true,
      body: toFormData(payload)
    })

    close()
    emit('deleted')
  })
}
</script>

<template>
  <AppModal
    :open="props.open"
    title="Tem certeza?"
    :description="`Enviamos um código de verificação para o e-mail ${props.mask}.`"
    :dismissible="!deleting"
    @update:open="close"
  >
    <VeeForm
      :validation-schema="codeVerificationSchema"
      class="flex flex-col gap-6"
      @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <AppInput
        name="codigo"
        label="Código de verificação (enviado ao e-mail)"
        :mask-input="MASK_CODE"
        placeholder="000000"
        input-mode="numeric"
        is-required
      />

      <div class="flex flex-col items-center gap-6">
        <AppButton
          type="button"
          variant="secondary"
          block
          :disabled="deleting"
          @click="close"
        >
          Continuar na promoção
        </AppButton>

        <button
          type="submit"
          class="text-body-sm cursor-pointer text-(--color-brand-primary) hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="deleting"
        >
          {{ deleting ? 'Excluindo...' : 'Sim, excluir meu cadastro' }}
        </button>
      </div>
    </VeeForm>
  </AppModal>
</template>
