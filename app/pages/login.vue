<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { AuthCodeResponse } from '~/types/verification'
import { loginSchema } from '~/schemas/login'
import { MASK_CPF } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { toFormData } from '~/utils/functions/formData.function'
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
const { isPromotionFinished } = usePromotionStatus()
const { goToVerification } = useVerificationHandoff()
const { requireConsentIfProd } = useOneTrustConsent()

function onSubmit(values: GenericObject) {
  if (!requireConsentIfProd(['C0003'])) return

  run(async () => {
    const payload = { document: onlyDigits(values.cpf) }

    const res = await useFetchData<AuthCodeResponse>(
      '/Authentication/GenerateAuthenticationCode',
      {
        method: 'POST',
        body: toFormData(payload)
      }
    )

    await goToVerification(res, 'login')
  })
}
</script>

<template>
  <AppAuthCard>
    <template #title>Login</template>
    <template #description>Informe seu CPF para continuar</template>
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
        autofocus
      />
      <AppButton type="submit" variant="secondary" block :loading="submitting"
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
  </AppAuthCard>
</template>
