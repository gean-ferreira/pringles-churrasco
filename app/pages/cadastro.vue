<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { registerSchema } from '~/schemas/register'
import { MASK_CPF, MASK_PHONE, MASK_DATE } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { formatToISO } from '~/utils/functions/date.function'
import { toFormData } from '~/utils/functions/formData.function'
import { UF_OPTIONS } from '~/utils/ufOptions'
import {
  LINK_REGULAMENTO_INSTANTANEO,
  LINK_REGULAMENTO_FINAL,
  LINK_POLITICA_PRIVACIDADE
} from '~/utils/links'
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
const { requireConsent } = useOneTrustConsent()

function onSubmit(values: GenericObject) {
  if (
    import.meta.env.VITE_SITE_ENV === 'production' &&
    !requireConsent(['C0003'])
  )
    return

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
  <main
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div class="mx-auto max-w-[720px] rounded-xl bg-white px-6 py-8">
        <header class="mb-10 text-center">
          <h1 class="text-h2 font-bold text-(--color-brand-primary) uppercase">
            Cadastre-se
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Preencha seus dados para participar
          </p>
        </header>
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
          <div class="flex flex-col gap-4">
            <AppCheckbox name="aceite_Regulamento">
              Li e aceito o regulamento da
              <a
                :href="LINK_REGULAMENTO_INSTANTANEO"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-(--color-brand-primary) hover:underline"
                >Premiação Instantânea</a
              >
              e do
              <a
                :href="LINK_REGULAMENTO_FINAL"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-(--color-brand-primary) hover:underline"
                >Sorteio Final</a
              >.
            </AppCheckbox>
            <AppCheckbox name="aceite_Politica">
              Li e entendi o
              <a
                :href="LINK_POLITICA_PRIVACIDADE"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-(--color-brand-primary) hover:underline"
                >Aviso de Privacidade</a
              >.
            </AppCheckbox>
            <AppCheckbox name="aceite_Novidades">
              Aceito receber e-mails com novidades e informações sobre a
              promoção.
            </AppCheckbox>
          </div>
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
            >Cadastrar</AppButton
          >
        </VeeForm>
      </div>
    </div>
  </main>
</template>
