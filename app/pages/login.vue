<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { loginSchema } from '~/schemas/login'
import { MASK_CPF } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { toFormData } from '~/utils/functions/formData.function'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'
import { useVerificationHandoff } from '~/composables/useVerificationHandoff'
import { useOneTrustConsent } from '~/composables/useOneTrustConsent'

definePageMeta({ middleware: ['guest'], name: 'Login' })

useSeoMeta({
  title: 'Login — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const notificationModalStore = useNotificationModalStore()
const { isPromotionFinished } = usePromotionStatus()
const { goToVerification } = useVerificationHandoff()
const { requireConsentIfProd } = useOneTrustConsent()

function onSubmit(values: GenericObject) {
  if (!requireConsentIfProd(['C0003'])) return

  run(async () => {
    const payload = { Cpf: onlyDigits(values.cpf) }

    const res = await useFetchData<{
      mensagem: string
      token: string
      confirmacaoCadastro: boolean
      contador: number
    }>('/Autenticacao/Autenticar', {
      method: 'POST',
      body: toFormData(payload)
    })

    if (res.confirmacaoCadastro) {
      notificationModalStore.openModal({
        title: 'Atenção!',
        description:
          'Enviamos um código de verificação para o seu e-mail. Insira o código na tela a seguir para ativar sua conta e fazer o login.',
        actions: [{ label: 'Fechar' }]
      })
    }
    await goToVerification(res, 'login')
  })
}
</script>

<template>
  <main
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div class="mx-auto max-w-[540px] rounded-xl bg-white px-6 py-8">
        <header class="mb-10 text-center">
          <h1 class="text-h2 font-bold text-(--color-brand-primary) uppercase">
            Login
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Informe seu CPF para continuar
          </p>
        </header>
        <VeeForm
          :validation-schema="loginSchema"
          class="flex flex-col gap-6"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <AppInput
            name="cpf"
            label="CPF"
            :mask-input="MASK_CPF"
            placeholder="000.000.000-00"
            input-mode="numeric"
            is-required
          />
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
            >Fazer login</AppButton
          >
          <ClientOnly>
            <p
              v-if="!isPromotionFinished"
              class="text-body-sm text-center text-(--color-brand-neutral-700)"
            >
              Primeiro acesso?
              <NuxtLink
                to="/cadastro"
                class="font-medium text-(--color-brand-primary) hover:underline"
                >Cadastre-se aqui</NuxtLink
              >
            </p>
          </ClientOnly>
        </VeeForm>
      </div>
    </div>
  </main>
</template>
