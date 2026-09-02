<script setup lang="ts">
import type { GenericObject, Form } from 'vee-validate'
import { contactSchema } from '~/schemas/contact'
import { MASK_PHONE } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { useUserPrefill } from '~/composables/useUserPrefill'
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'Fale Conosco' })

useSeoMeta({
  title: 'Fale Conosco — Pringles Churrasco',
  description: 'Entre em contato sobre a promoção Pringles Churrasco.',
  ogTitle: 'Fale Conosco — Pringles Churrasco',
  ogDescription: 'Entre em contato sobre a promoção Pringles Churrasco.',
  ogUrl: `${url}/fale-conosco`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/fale-conosco` }] })

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const notificationModalStore = useNotificationModalStore()
const { prefilling, prefill } = useUserPrefill()
const formRef = ref<typeof Form | null>(null)

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = {
      nome: values.nome.trim(),
      email: values.email.trim(),
      telefone: onlyDigits(values.telefone),
      mensagem: values.mensagem.trim()
    }

    await useFetchData('/FaleConosco/Enviar', { method: 'POST', body: payload })

    notificationModalStore.openModal({
      title: 'Mensagem enviada com sucesso!',
      description: 'Agora é só aguardar, em breve retornaremos o contato.',
      actions: [
        {
          label: 'Fechar',
          handler: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            formRef.value?.resetForm()
          }
        }
      ]
    })
  })
}

onMounted(() => {
  prefill(formRef, (user) => ({
    nome: `${user.nome} ${user.sobrenome}`,
    telefone: user.telefone,
    email: user.email
  }))
})
</script>

<template>
  <main
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div class="mx-auto max-w-[720px] rounded-xl bg-white px-6 py-8">
        <header class="mb-10 text-center">
          <h1 class="text-h2 font-bold text-(--color-brand-primary) uppercase">
            Fale conosco
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Preencha o formulário e deixe sua mensagem.
          </p>
        </header>
        <VeeForm
          ref="formRef"
          v-slot="{ values }"
          :validation-schema="contactSchema"
          class="flex flex-col gap-6"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <AppInput
            name="nome"
            label="Nome"
            placeholder="Insira seu nome completo"
            :loading="prefilling"
            is-required
          />
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AppInput
              name="email"
              label="E-mail"
              type="email"
              placeholder="email@exemplo.com.br"
              :loading="prefilling"
              is-required
            />
            <AppInput
              name="telefone"
              label="Celular"
              :mask-input="MASK_PHONE"
              placeholder="(DDD) + Celular"
              input-mode="numeric"
              :loading="prefilling"
              is-required
            />
          </div>
          <AppInput
            name="mensagem"
            label="Mensagem"
            type="textarea"
            placeholder="Escreva sua mensagem"
            :description="`${values.mensagem?.length || 0} de 500 caracteres`"
            is-required
          />
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
            >Enviar mensagem</AppButton
          >
        </VeeForm>
      </div>
    </div>
  </main>
</template>
