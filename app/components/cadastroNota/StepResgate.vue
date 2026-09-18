<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { notaFiscalSchema } from '~/schemas/notaFiscal'
import { toFormData } from '~/utils/functions/formData.function'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

const participacaoStore = useParticipacaoStore()
const notificationModalStore = useNotificationModalStore()

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = {
      participacaoId: participacaoStore.idParticipacao?.toString() ?? '',
      Anexo: values.anexo
    }

    await useFetchData('/Endereco/Cadastrar', {
      method: 'POST',
      body: toFormData(payload),
      requiresAuth: true
    })

    participacaoStore.invalidate()
    notificationModalStore.openModal({
      title: 'Sua nota foi enviada com sucesso!',
      description:
        'Agora sua nota passará por <span class="font-bold text-(--color-brand-primary)">moderação e em até XX dias</span> você receberá um e-mail de atualização da validação da nota.',
      dismissible: false,
      closeIcon: false,
      actions: [
        {
          label: 'Ir para extrato',
          handler: async () => {
            await navigateTo('/extrato')
            notificationModalStore.closeModal()
          }
        }
      ]
    })
  })
}
</script>

<template>
  <VeeForm
    :validation-schema="notaFiscalSchema"
    class="flex flex-col gap-6 text-left"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <AppUpload name="anexo" label="Upload de Nota Fiscal" is-required />
    <AppButton type="submit" variant="secondary" block :loading="submitting">
      Enviar
    </AppButton>
  </VeeForm>
</template>
