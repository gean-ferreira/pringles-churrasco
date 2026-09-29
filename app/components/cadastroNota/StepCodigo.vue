<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { pincodeSchema } from '~/schemas/pincode'
import { MASK_PIN_CODE, PIN_CODE_INPUT_MODE } from '~/utils/masks'
import { toFormData } from '~/utils/functions/formData.function'
import { useParticipacaoStore } from '~/stores/participacao.store'

const emit = defineEmits<{ registered: [] }>()

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const participacaoStore = useParticipacaoStore()

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = {
      pinCode: values.codigo,
      flavorId: participacaoStore.flavorId
    }

    const res = await useFetchData<{ participationId: number }>(
      '/Participation/ReceivePinCode',
      {
        method: 'POST',
        body: toFormData(payload),
        requiresAuth: true
      }
    )

    participacaoStore.setIdParticipacao(res.participationId)
    emit('registered')
  })
}
</script>

<template>
  <div class="grid w-full grid-cols-12 gap-8 pb-14 md:pb-25">
    <div class="col-span-12 md:col-span-6">
      <AppComicCard>
        <template #title>Cadastre seu código</template>
        <template #description>
          Cadastre o Pin Code encontrado no lacre da sua Pringles®
        </template>

        <div
          class="relative shrink-0 overflow-hidden rounded-xl border-4 border-(--color-brand-outline) shadow-[8px_8px_0px_0px_var(--color-brand-outline)] md:hidden"
        >
          <div class="absolute inset-0 bg-(--color-brand-accent-green)" />
          <div aria-hidden="true" class="card-pattern" />
          <img
            src="/images/cadastro-nota-lata-aberta.png"
            alt="Lata de Pringles aberta mostrando o código PIN impresso na tampa"
            class="relative mx-auto size-full max-w-[195px] object-cover"
          />
        </div>

        <VeeForm
          :validation-schema="pincodeSchema"
          class="flex flex-col gap-6"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <AppInput
            name="codigo"
            label="Pin Code"
            :mask-input="MASK_PIN_CODE"
            placeholder="Insira o Pin Code"
            :input-mode="PIN_CODE_INPUT_MODE"
            is-required
            autofocus
          />
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
          >
            Cadastrar
          </AppButton>
        </VeeForm>
      </AppComicCard>
    </div>

    <div
      class="relative col-span-12 hidden overflow-hidden rounded-xl border-4 border-(--color-brand-outline) shadow-[8px_8px_0px_0px_var(--color-brand-outline)] md:col-span-6 md:flex md:items-center md:justify-center"
    >
      <div class="absolute inset-0 bg-(--color-brand-accent-green)" />
      <div aria-hidden="true" class="card-pattern" />
      <img
        src="/images/cadastro-nota-lata-aberta.png"
        width="393"
        height="528"
        alt="Lata de Pringles aberta mostrando o código PIN impresso na tampa"
        class="relative size-full max-w-[393px] object-cover"
      />
    </div>
  </div>
</template>
