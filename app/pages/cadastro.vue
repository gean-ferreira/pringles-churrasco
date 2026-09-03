<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { registerSchema } from '~/schemas/register'
import { MASK_CPF, MASK_PHONE, MASK_DATE } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { formatToISO } from '~/utils/functions/date.function'
import { toFormData } from '~/utils/functions/formData.function'
import { UF_OPTIONS } from '~/utils/ufOptions'
import { useVerificationHandoff } from '~/composables/useVerificationHandoff'
import { useOneTrustConsent } from '~/composables/useOneTrustConsent'
import { url } from '~/utils/constants/seo.constant'

definePageMeta({ middleware: ['guest', 'check-promotion'], name: 'Cadastro' })

useSeoMeta({
  title: 'Cadastro — Pringles Churrasco',
  description: 'Cadastre-se na promoção Pringles Churrasco.',
  ogTitle: 'Cadastro — Pringles Churrasco',
  ogDescription: 'Cadastre-se na promoção Pringles Churrasco.',
  ogUrl: `${url}/cadastro`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/cadastro` }] })

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const { goToVerification } = useVerificationHandoff()
const { requireConsentIfProd } = useOneTrustConsent()

function onSubmit(values: GenericObject) {
  if (!requireConsentIfProd(['C0003'])) return

  run(async () => {
    const payload = {
      Cpf: onlyDigits(values.cpf),
      Nome: values.nome.trim(),
      Sobrenome: values.sobrenome.trim(),
      Telefone: onlyDigits(values.telefone),
      dt_nascimento: formatToISO(values.dt_nascimento),
      Estado: values.estado,
      Email: values.email.trim(),
      Aceite_Regulamento: values.aceite_Regulamento ? 'true' : 'false',
      Aceite_Politica: values.aceite_Politica ? 'true' : 'false',
      Aceite_Novidades: values.aceite_Novidades ? 'true' : 'false'
    }

    const res = await useFetchData<{ mensagem: string; token: string }>(
      '/Usuario/Cadastrar',
      {
        method: 'POST',
        body: toFormData(payload)
      }
    )

    await goToVerification(res, 'cadastro')
  })
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-(--color-brand-accent-green) py-14 md:py-25"
  >
    <AppBgPattern />
    <div class="relative container flex justify-center">
      <div class="w-full max-w-[800px]">
        <AppComicCard>
          <template #title>Faça o seu cadastro</template>
          <template #description>
            Todos os campos do formulário são de preenchimento obrigatório.
          </template>
          <VeeForm
            :validation-schema="registerSchema"
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
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AppInput
                name="nome"
                label="Nome"
                placeholder="Insira seu nome"
                is-required
              />
              <AppInput
                name="sobrenome"
                label="Sobrenome"
                placeholder="Insira seu sobrenome"
                is-required
              />
            </div>
            <AppInput
              name="telefone"
              label="Celular"
              :mask-input="MASK_PHONE"
              placeholder="(DDD) + Celular"
              input-mode="numeric"
              is-required
            />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AppInput
                name="email"
                label="E-mail"
                type="email"
                placeholder="email@exemplo.com.br"
                is-required
              />
              <AppInput
                name="confirmEmail"
                label="Confirme seu e-mail"
                type="email"
                placeholder="email@exemplo.com.br"
                is-required
              />
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AppInput
                name="dt_nascimento"
                label="Data de nascimento"
                :mask-input="MASK_DATE"
                placeholder="dd/mm/aaaa"
                input-mode="numeric"
                is-required
              />
              <AppSelect
                name="estado"
                label="Estado"
                :options="UF_OPTIONS"
                is-required
              />
            </div>
            <FormsConsentCheckboxes show-newsletter />
            <AppButton
              type="submit"
              variant="secondary"
              block
              :loading="submitting"
              >Cadastrar</AppButton
            >
          </VeeForm>
        </AppComicCard>
      </div>
    </div>
  </section>
</template>
