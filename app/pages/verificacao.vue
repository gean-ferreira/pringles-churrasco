<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
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
const { requireConsent } = useOneTrustConsent()

const email = route.query.email as string | undefined
const token = route.query.token ? (route.query.token as string).replace(/%/g, '+') : ''
const contador = Number(route.query.contador)

// Página só faz sentido via handoff de login/cadastro (query email+token) —
// guard client-side, ver SKILL.md nota sobre páginas ssr:false flow-gated.
onMounted(() => {
  if (!email || !token) {
    notificationModalStore.openModal({ title: 'Atenção', description: 'Erro ao processar a requisição.', actions: [{ label: 'Fechar' }] })
    navigateTo('/')
    return
  }
  countdown.start(!isNaN(contador) && contador > 0 ? contador : RESEND_SECONDS)
})

const countdown = useCountdown(RESEND_SECONDS)
const { onInvalidSubmit } = useFormError()
const { loading: submitting, run: runSubmit } = useAsyncSubmit()
const { loading: resending, run: runResend } = useAsyncSubmit()

function onSubmit(values: GenericObject) {
  if (import.meta.env.VITE_SITE_ENV === 'production' && !requireConsent(['C0003'])) return

  runSubmit(async () => {
    const payload = { Token: token, Codigo: values.codigo }

    const res = await useFetchData<{ token: string }>('/Autenticacao/ValidarCodigo', {
      method: 'POST',
      body: toFormData(payload)
    })

    if (res.token) {
      authStore.setToken(res.token)
      await navigateTo('/')
    } else {
      notificationModalStore.openModal({
        title: 'Cadastro ativado com sucesso',
        description: 'Faça login para continuar.',
        actions: [{ label: 'Fechar' }]
      })
      await navigateTo('/login')
    }
  })
}

function onResend() {
  runResend(async () => {
    const payload = { Token: token }
    await useFetchData('/Autenticacao/ReenviarCodigoVerificacao', { method: 'POST', body: toFormData(payload) })
    notificationModalStore.openModal({ title: 'Código reenviado', description: 'Código reenviado com sucesso.', actions: [{ label: 'Fechar' }] })
    countdown.start()
  })
}
</script>

<template>
  <main class="min-h-screen bg-(--color-brand-primary) pb-25 pt-(--header-height)">
    <div class="container pt-18">
      <div class="mx-auto max-w-[540px] rounded-xl bg-white px-6 py-8">
        <header class="mb-10 text-center">
          <h1 class="text-h2 font-bold uppercase text-(--color-brand-primary)">
            Insira o código de verificação
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Enviamos um código de verificação de 6 dígitos para o e-mail{{ email ? ':' : '.' }}
            <span v-if="email" :title="email" class="font-medium text-(--color-brand-primary)">{{ email }}</span>.
          </p>
        </header>
        <VeeForm :validation-schema="codeVerificationSchema" class="flex flex-col gap-6" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
          <AppInput name="codigo" label="Código de verificação" :mask-input="MASK_CODE" placeholder="000000" input-mode="numeric" is-required />
          <AppButton type="submit" variant="secondary" block :loading="submitting">Validar código</AppButton>
          <div class="text-center">
            <button
              type="button"
              class="text-body-sm uppercase text-(--color-brand-neutral-700)"
              :class="countdown.canResend.value ? 'cursor-pointer hover:underline' : 'pointer-events-none opacity-50'"
              :disabled="!countdown.canResend.value || resending"
              @click="onResend"
            >
              Reenviar código <span v-if="!countdown.canResend.value">{{ countdown.label.value }}</span>
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </main>
</template>
