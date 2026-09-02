<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { pincodeSchema } from '~/schemas/pincode'
import { MASK_NFE_CODE } from '~/utils/masks'
import { toFormData } from '~/utils/functions/formData.function'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

definePageMeta({
  middleware: ['auth', 'check-promotion'],
  name: 'Cadastro de nota'
})

useSeoMeta({
  title: 'Cadastrar código — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const { loading: checkingPending, run: runCheckPending } = useAsyncSubmit()
const participacaoStore = useParticipacaoStore()
const notificationModalStore = useNotificationModalStore()

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = { pincode: values.codigo }

    const res = await useFetchData<{ mensagem: string }>(
      '/Pincode/ValidarPincode',
      {
        method: 'POST',
        body: toFormData(payload),
        requiresAuth: true
      }
    )

    participacaoStore.setIdParticipacao(Number(res.mensagem))
    participacaoStore.setStep(2)
    await navigateTo('/abrir-lata')
  })
}

// Retoma um fluxo pendente (ex.: usuário registrou o código mas fechou a aba
// antes de abrir a lata ou preencher o endereço) — mesma checagem do kellanova.
onMounted(() => {
  runCheckPending(async () => {
    const res = await useFetchData<{
      idParticipacao: number
      mensagem: string
    }>('/Premio/EtapaPremioPendente', {
      method: 'GET',
      requiresAuth: true
    })

    const step = Number(res.mensagem)
    if (!res.idParticipacao || !step || step <= 1) return

    participacaoStore.setIdParticipacao(res.idParticipacao)
    participacaoStore.setStep(step)
    notificationModalStore.openModal({
      title: step === 2 ? 'Abra sua lata' : 'Preencha seu endereço',
      description:
        step === 2
          ? 'Parece que você ainda não usou sua chance de abrir a lata.'
          : 'Parece que você ainda não preencheu seu endereço.',
      actions: [
        {
          label: 'Continuar',
          handler: async () => {
            await navigateTo('/abrir-lata')
          }
        }
      ]
    })
  })
})
</script>

<template>
  <main
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div class="mx-auto max-w-[540px] rounded-xl bg-white px-6 py-8">
        <header class="mb-10 text-center">
          <h1 class="text-h2 font-bold text-(--color-brand-primary) uppercase">
            Cadastre seu código
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Cadastre o código encontrado na embalagem da sua Pringles<sup
              >®</sup
            >
          </p>
        </header>
        <VeeForm
          :validation-schema="pincodeSchema"
          class="flex flex-col gap-6"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <AppInput
            name="codigo"
            label="Código"
            :mask-input="MASK_NFE_CODE"
            placeholder="Insira o código"
            input-mode="numeric"
            :disabled="checkingPending"
            :loading="checkingPending"
            is-required
          />
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
            :disabled="checkingPending"
          >
            Cadastrar
          </AppButton>
        </VeeForm>
      </div>
    </div>
  </main>
</template>
