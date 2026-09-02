<script setup lang="ts">
import type { Form, GenericObject } from 'vee-validate'
import { registerEditSchema } from '~/schemas/registerEdit'
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
import { useUserPrefill } from '~/composables/useUserPrefill'
import { useUserStore } from '~/stores/user.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

definePageMeta({ middleware: 'auth', name: 'Editar Cadastro' })

useSeoMeta({
  title: 'Editar Cadastro — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const { onInvalidSubmit } = useFormError()
const { loading: submitting, run } = useAsyncSubmit()
const { prefilling, prefill } = useUserPrefill()
const userStore = useUserStore()
const notificationModalStore = useNotificationModalStore()
const formRef = ref<typeof Form | null>(null)
const isDeleteModalOpen = ref(false)

function onSubmit(values: GenericObject) {
  run(async () => {
    const payload = {
      Telefone: onlyDigits(values.telefone),
      Dt_nascimento: formatToISO(values.dt_nascimento),
      Estado: values.estado
    }

    await useFetchData('/Usuario/Editar', {
      method: 'POST',
      body: toFormData(payload),
      requiresAuth: true
    })

    if (userStore.user) {
      userStore.setUser({
        ...userStore.user,
        telefone: onlyDigits(values.telefone),
        dt_nascimento: values.dt_nascimento,
        estado: values.estado
      })
    }

    notificationModalStore.openModal({
      title: 'Tudo certo!',
      description: 'Alteração cadastral realizada com sucesso.',
      actions: [
        {
          label: 'Fechar',
          handler: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      ]
    })
  })
}

onMounted(() => {
  prefill(formRef, (user) => ({
    cpf: user.cpf,
    nome: user.nome,
    sobrenome: user.sobrenome,
    telefone: user.telefone,
    email: user.email,
    dt_nascimento: user.dt_nascimento,
    estado: user.estado,
    aceite_Regulamento: user.aceite_Regulamento,
    aceite_Politica: user.aceite_Politica
  }))
})
</script>

<template>
  <section
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div class="mx-auto max-w-[720px] rounded-xl bg-white px-6 py-8">
        <header class="mb-12">
          <h1 class="text-h2 font-bold text-(--color-brand-primary) uppercase">
            Dados cadastrais
          </h1>
          <p class="text-body-base text-(--color-brand-neutral-700)">
            Mantenha seu cadastro atualizado.
          </p>
        </header>
        <VeeForm
          ref="formRef"
          :validation-schema="registerEditSchema"
          class="flex flex-col gap-6"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <AppInput
            name="cpf"
            label="CPF"
            :mask-input="MASK_CPF"
            disabled
            :loading="prefilling"
            is-required
          />
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AppInput
              name="nome"
              label="Nome"
              disabled
              :loading="prefilling"
              is-required
            />
            <AppInput
              name="sobrenome"
              label="Sobrenome"
              disabled
              :loading="prefilling"
              is-required
            />
          </div>
          <AppInput
            name="telefone"
            label="Celular"
            :mask-input="MASK_PHONE"
            input-mode="numeric"
            :loading="prefilling"
            is-required
          />
          <AppInput
            name="email"
            label="E-mail"
            type="email"
            disabled
            :loading="prefilling"
            is-required
          />
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AppInput
              name="dt_nascimento"
              label="Data de nascimento"
              :mask-input="MASK_DATE"
              input-mode="numeric"
              :loading="prefilling"
              is-required
            />
            <AppSelect
              name="estado"
              label="Estado"
              :options="UF_OPTIONS"
              :loading="prefilling"
              is-required
            />
          </div>
          <div class="flex flex-col gap-4">
            <AppCheckbox
              name="aceite_Regulamento"
              disabled
              :loading="prefilling"
            >
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
            <AppCheckbox name="aceite_Politica" disabled :loading="prefilling">
              Li e entendi o
              <a
                :href="LINK_POLITICA_PRIVACIDADE"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-(--color-brand-primary) hover:underline"
                >Aviso de Privacidade</a
              >.
            </AppCheckbox>
          </div>
          <AppButton
            type="submit"
            variant="secondary"
            block
            :loading="submitting"
            >Salvar alterações</AppButton
          >
        </VeeForm>
        <div class="mt-14 text-center">
          <button
            type="button"
            class="text-body-sm text-(--color-brand-primary) hover:underline"
            @click="isDeleteModalOpen = true"
          >
            Excluir minha conta
          </button>
        </div>
      </div>
    </div>
    <EditarCadastroDeleteAccountModal v-model:open="isDeleteModalOpen" />
  </section>
</template>
