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
      title:
        'sua Mensagem foi<br class="hidden xl:block"> enviada com sucesso!',
      description: 'Agora é só aguardar, em breve retornaremos o contato.',
      actions: [
        {
          label: 'Fechar',
          handler: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            formRef.value?.resetForm()
            notificationModalStore.closeModal()
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
  <section
    class="relative overflow-hidden bg-(--color-brand-secondary) py-14 md:py-25"
  >
    <AppBgPattern />

    <div class="relative container flex justify-center">
      <div class="relative w-full max-w-[792px]">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -bottom-1/3 -left-56 hidden h-[521px] w-[269px] xl:block xl:bg-[url('/images/fale-conosco-garfo.png')] xl:bg-contain xl:bg-no-repeat"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-56 -bottom-1/3 hidden h-[521px] w-[269px] -scale-y-100 rotate-180 xl:block xl:bg-[url('/images/fale-conosco-garfo.png')] xl:bg-contain xl:bg-no-repeat"
        />
        <AppComicCard>
          <template #title>Fale conosco</template>
          <template #description>
            Preencha o formulário e deixe sua mensagem.<br
              class="hidden md:block"
            />
            Todos os campos são de preenchimento obrigatório.
          </template>

          <VeeForm
            ref="formRef"
            v-slot="{ values }"
            :validation-schema="contactSchema"
            class="flex flex-col gap-10"
            @submit="onSubmit"
            @invalid-submit="onInvalidSubmit"
          >
            <div class="flex flex-col gap-6">
              <AppInput
                name="nome"
                label="Nome"
                placeholder="Insira seu nome completo"
                :loading="prefilling"
                is-required
              />
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <AppLgpdNotice purpose="atender à sua demanda" />
            </div>
            <AppButton
              type="submit"
              variant="secondary"
              block
              :loading="submitting"
              >Enviar mensagem</AppButton
            >
          </VeeForm>
        </AppComicCard>
      </div>
    </div>
  </section>
</template>
