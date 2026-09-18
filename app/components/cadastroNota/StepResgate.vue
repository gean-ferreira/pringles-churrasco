<script setup lang="ts">
import type { GenericObject, Form } from 'vee-validate'
import { addressSchema } from '~/schemas/address'
import { MASK_CEP, MASK_PHONE } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { toFormData } from '~/utils/functions/formData.function'
import { UF_OPTIONS } from '~/utils/ufOptions'
import { useCepLookup } from '~/composables/useCepLookup'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

const participacaoStore = useParticipacaoStore()
const notificationModalStore = useNotificationModalStore()

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const { lookup, looking } = useCepLookup()
const formRef = ref<typeof Form | null>(null)

const CAMPOS_CEP = ['rua', 'bairro', 'cidade', 'estado'] as const

async function onCepBlur(event: FocusEvent) {
  const cep = (event.target as HTMLInputElement).value
  if (onlyDigits(cep).length !== 8) return

  const found = await lookup(cep)
  if (!found) return

  formRef.value?.setValues(
    {
      rua: found.rua,
      bairro: found.bairro,
      cidade: found.cidade,
      estado: found.estado
    },
    false
  )
  CAMPOS_CEP.forEach((campo) => formRef.value?.validateField(campo))
}

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = {
      participacaoId: participacaoStore.idParticipacao?.toString() ?? '',
      Telefone: onlyDigits(values.celular),
      Anexo: values.anexo,
      'Endereco.Cep': onlyDigits(values.cep),
      'Endereco.Rua': values.rua.trim(),
      'Endereco.Numero': values.numero.trim(),
      'Endereco.Bairro': values.bairro.trim(),
      'Endereco.Estado': values.estado,
      'Endereco.Cidade': values.cidade.trim(),
      'Endereco.Complemento': values.complemento?.trim() ?? ''
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
    ref="formRef"
    :validation-schema="addressSchema"
    class="flex flex-col gap-6 text-left"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="flex items-end gap-4">
      <AppInput
        name="cep"
        label="CEP"
        :mask-input="MASK_CEP"
        placeholder="00000-000"
        input-mode="numeric"
        :loading="looking"
        class="flex-1"
        is-required
        @blur="onCepBlur"
      />
      <a
        class="text-body-sm text-(--color-brand-primary) hover:underline"
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
      >
        Não sei meu CEP
      </a>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
      <AppInput
        name="rua"
        label="Rua / Avenida"
        :loading="looking"
        class="md:col-span-3"
        is-required
      />
      <AppInput name="numero" label="Número" is-required />
    </div>
    <AppInput
      name="complemento"
      label="Complemento"
      placeholder="Casa, apartamento, bloco"
    />
    <AppInput name="bairro" label="Bairro" :loading="looking" is-required />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <AppInput name="cidade" label="Cidade" :loading="looking" is-required />
      <AppSelect
        name="estado"
        label="Estado"
        :options="UF_OPTIONS"
        :loading="looking"
        is-required
      />
    </div>
    <AppInput
      name="celular"
      label="Celular"
      :mask-input="MASK_PHONE"
      input-mode="numeric"
      is-required
    />
    <AppUpload name="anexo" />
    <AppButton type="submit" variant="secondary" block :loading="submitting">
      Enviar
    </AppButton>
  </VeeForm>
</template>
