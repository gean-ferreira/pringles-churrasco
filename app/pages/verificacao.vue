<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { LoginResponse } from '~/types/verification'
import { codeVerificationSchema } from '~/schemas/codeVerification'
import { MASK_CODE } from '~/utils/masks'
import { useAuthStore } from '~/stores/auth.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { useOneTrustConsent } from '~/composables/useOneTrustConsent'
import { toFormData } from '~/utils/functions/formData.function'

definePageMeta({ ssr: false, name: 'Verificacao' })

useSeoMeta({
  title: 'Verificação — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const RESEND_SECONDS = 90

const route = useRoute()
const authStore = useAuthStore()
const notificationModalStore = useNotificationModalStore()
const { requireConsentIfProd } = useOneTrustConsent()

const email = route.query.email as string | undefined
const token = route.query.token
  ? (route.query.token as string).replace(/%/g, '+')
  : ''

onMounted(() => {
  if (!email || !token) {
    notificationModalStore.openModal({
      title: 'Atenção',
      description: 'Erro ao processar a requisição.',
      actions: [{ label: 'Fechar' }]
    })
    navigateTo('/')
    return
  }
  countdown.start(RESEND_SECONDS)
})

const countdown = useCountdown(RESEND_SECONDS)
const { onInvalidSubmit } = useFormError()
const { loading: submitting, run: runSubmit } = useAsyncSubmit()
const { loading: resending, run: runResend } = useAsyncSubmit()

function onSubmit(values: GenericObject) {
  if (!requireConsentIfProd(['C0003'])) return

  runSubmit(async () => {
    const payload = { token, codigo: values.codigo }

    const res = await useFetchData<LoginResponse>('/Authentication/Login', {
      method: 'POST',
      body: toFormData(payload)
    })

    authStore.setToken(res.token)
    await navigateTo('/')
  })
}

function onResend() {
  runResend(async () => {
    const payload = { token }
    await useFetchData('/Authentication/ResendCode', {
      method: 'POST',
      body: toFormData(payload)
    })
    notificationModalStore.openModal({
      title: 'Código reenviado',
      description: 'Código reenviado com sucesso.',
      actions: [{ label: 'Fechar' }]
    })
    countdown.start()
  })
}
</script>

<template>
  <AppAuthCard>
    <template #title>Código de verificação</template>
    <template #description>
      Enviamos um código para o e-mail: {{ email ? ':' : '.' }}
      <span
        v-if="email"
        :title="email"
        class="font-medium text-(--color-brand-primary)"
        >{{ email }}</span
      >. Após receber o código, volte para cadastrar o seu Pin Code.
    </template>
    <VeeForm
      :validation-schema="codeVerificationSchema"
      class="flex flex-col gap-6"
      @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <AppInput
        name="codigo"
        label="Código de verificação"
        :mask-input="MASK_CODE"
        placeholder="000000"
        input-mode="numeric"
        is-required
        autofocus
      />
      <AppButton type="submit" variant="secondary" block :loading="submitting"
        >Validar código</AppButton
      >
      <div class="text-center">
        <button
          type="button"
          class="text-body-sm text-(--color-brand-neutral-700) uppercase"
          :class="
            countdown.canResend.value
              ? 'cursor-pointer hover:underline'
              : 'pointer-events-none opacity-50'
          "
          :disabled="!countdown.canResend.value || resending"
          @click="onResend"
        >
          Reenviar código
          <span v-if="!countdown.canResend.value">{{
            countdown.label.value
          }}</span>
        </button>
      </div>
    </VeeForm>
  </AppAuthCard>
</template>
