<script setup lang="ts">
import type { Form } from 'vee-validate'
import type { VerificationMascaras } from '~/types/verification'
import { MASK_CPF, MASK_PHONE, MASK_DATE } from '~/utils/masks'
import { UF_OPTIONS } from '~/utils/ufOptions'
import { useUserPrefill } from '~/composables/useUserPrefill'
import { useUserStore } from '~/stores/user.store'
import { useFetchData } from '~/composables/useFetchData'
import { useAsyncSubmit } from '~/composables/useAsyncSubmit'
import { useLogout } from '~/composables/useLogout'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

definePageMeta({ middleware: 'auth', name: 'Meu Perfil' })

useSeoMeta({
  title: 'Meu Perfil — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const { prefilling, prefill } = useUserPrefill()
const userStore = useUserStore()
const { logout } = useLogout()
const notificationModalStore = useNotificationModalStore()
const formRef = ref<typeof Form | null>(null)

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
    aceite_Politica: user.aceite_Politica,
    aceite_Novidades: user.aceite_Novidades
  }))
})

const { run: runEdit } = useAsyncSubmit()

// Página não tem submit: "aceite_Novidades" é o único campo editável, então só
// observamos essa mudança em vez de esperar um botão salvar.
watch(
  () => formRef.value?.values.aceite_Novidades,
  (value, oldValue) => {
    if (oldValue === undefined || value === undefined) return
    runEdit(async () => {
      // Único endpoint da API que recebe JSON no body (não form).
      await useFetchData('/User/Edit', {
        method: 'POST',
        body: { acceptsMarketingEmails: value as boolean },
        requiresAuth: true
      })
      if (userStore.user) {
        userStore.setUser({
          ...userStore.user,
          aceite_Novidades: value as boolean
        })
      }
    })
  }
)

const isDeleteModalOpen = ref(false)
const deleteVerification = ref<VerificationMascaras | null>(null)
const { loading: generatingCode, run: runGenerateCode } = useAsyncSubmit()

function onRequestDelete() {
  runGenerateCode(async () => {
    // TODO(back): aguardando endpoint de geração/validação do OTP de exclusão.
    // A API nova (ap.md) só tem DELETE /User/Delete, sem código — o fluxo com
    // código (Figma) segue nas rotas legadas até o back entregar.
    const res = await useFetchData<VerificationMascaras>(
      '/Usuario/GerarCodigoExclusao',
      { method: 'POST', requiresAuth: true }
    )
    deleteVerification.value = res
    isDeleteModalOpen.value = true
  })
}

async function onAccountDeleted() {
  // Desloga e sai da rota autenticada ANTES do aviso: a conta já não existe no
  // back, então a sessão não pode sobreviver a um F5 ou ao fechar a modal.
  await logout()

  notificationModalStore.openModal({
    title: 'Conta excluída!',
    description:
      'Todos os seus dados foram excluídos<br class="hidden xl:block" /> da nossa base e você não está<br class="hidden xl:block" /> mais participando da promoção.',
    actions: [{ label: 'OK' }]
  })
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-(--color-brand-accent-green) py-14 md:py-25"
  >
    <AppBgPattern />
    <div class="relative container flex flex-col items-center gap-8">
      <div class="w-full max-w-[800px]">
        <AppComicCard>
          <template #title>Dados cadastrais</template>
          <template #description> Mantenha seu cadastro atualizado. </template>

          <VeeForm ref="formRef" class="flex flex-col gap-8">
            <div class="flex flex-col gap-6">
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
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AppInput
                  name="dt_nascimento"
                  label="Data de nascimento"
                  :mask-input="MASK_DATE"
                  disabled
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
              </div>
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AppInput
                  name="telefone"
                  label="Celular"
                  :mask-input="MASK_PHONE"
                  disabled
                  :loading="prefilling"
                  is-required
                />
                <AppSelect
                  name="estado"
                  label="Estado"
                  :options="UF_OPTIONS"
                  disabled
                  :loading="prefilling"
                  is-required
                />
              </div>
            </div>

            <FormsConsentCheckboxes
              disabled
              :loading="prefilling"
              show-newsletter
            />

            <AppLgpdNotice purpose="atender à sua demanda" />
          </VeeForm>
        </AppComicCard>
      </div>

      <div
        class="comic-chrome-lg flex w-full max-w-[800px] flex-col items-center gap-8 rounded-xl bg-white p-6 text-center xl:p-10"
      >
        <div class="flex flex-col items-center gap-2">
          <h2
            class="text-h4 text-shadow-comic text-stroke-comic font-bold text-(--color-brand-secondary) uppercase"
          >
            Alteração cadastral
          </h2>
          <p class="text-body-sm text-(--color-brand-neutral-800)">
            Caso deseje realizar alguma alteração, entre em contato com nosso
            time.
          </p>
        </div>
        <AppButton
          to="/fale-conosco"
          variant="secondary"
          class="w-full max-w-[380px]"
        >
          Fale conosco
        </AppButton>
      </div>

      <div
        class="comic-chrome-lg flex w-full max-w-[800px] flex-col items-center gap-8 rounded-xl bg-white p-6 text-center xl:p-10"
      >
        <div class="flex flex-col items-center gap-2">
          <h2
            class="text-h4 text-shadow-comic text-stroke-comic font-bold text-(--color-brand-secondary) uppercase"
          >
            Deseja excluir sua conta?
          </h2>
          <p class="text-body-sm text-(--color-brand-neutral-800)">
            A exclusão da conta é permanente e encerra sua participação na
            campanha. Para participar novamente, será necessário um novo
            cadastro.
          </p>
        </div>
        <button
          type="button"
          class="text-body-base cursor-pointer font-bold text-(--color-brand-primary) uppercase hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="!userStore.user || generatingCode"
          @click="onRequestDelete"
        >
          {{ generatingCode ? 'Enviando código...' : 'Excluir minha conta' }}
        </button>
      </div>
    </div>

    <EditarCadastroDeleteAccountModal
      v-model:open="isDeleteModalOpen"
      :mask="deleteVerification?.mascara ?? ''"
      :token="deleteVerification?.token ?? ''"
      @deleted="onAccountDeleted"
    />
  </section>
</template>
