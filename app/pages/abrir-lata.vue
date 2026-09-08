<script setup lang="ts">
import type { GenericObject, Form } from 'vee-validate'
import { addressSchema } from '~/schemas/address'
import { MASK_CEP, MASK_PHONE } from '~/utils/masks'
import { onlyDigits } from '~/utils/functions/sanitize.function'
import { toFormData } from '~/utils/functions/formData.function'
import { UF_OPTIONS } from '~/utils/ufOptions'
import { useCepLookup } from '~/composables/useCepLookup'
import { useParticipacaoStore } from '~/stores/participacao.store'
import { useExtratoStore } from '~/stores/extrato.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

definePageMeta({ ssr: false, middleware: 'auth', name: 'Abrir lata' })

useSeoMeta({
  title: 'Abrir lata — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const participacaoStore = useParticipacaoStore()
const extratoStore = useExtratoStore()
const notificationModalStore = useNotificationModalStore()

// Flow-gated: só faz sentido chegando de /cadastro-nota com uma participação em aberto.
onMounted(() => {
  if (!participacaoStore.idParticipacao) navigateTo('/cadastro-nota')
})

// --- Reveal (abrir a lata) ---
const { loading: opening, run: runOpen } = useAsyncSubmit()
const reward = ref<string | null>(null)

function openLata() {
  runOpen(async () => {
    const res = await useFetchData<{ premioRetornoDto: { premio: string } }>(
      `/Premio/Premiar?idParticipacao=${participacaoStore.idParticipacao}`,
      { method: 'GET', requiresAuth: true }
    )
    reward.value = res.premioRetornoDto.premio
    extratoStore.invalidate()

    if (reward.value === 'naofoidessavez') {
      notificationModalStore.openModal({
        title: 'Poxa, não foi dessa vez!',
        description:
          'Não se preocupe, você ainda tem chance de ganhar no sorteio final. Confira seu número da sorte no extrato.',
        dismissible: false,
        closeIcon: false,
        actions: [
          {
            label: 'Ver número da sorte',
            handler: async () => {
              await navigateTo('/extrato')
              notificationModalStore.closeModal()
            }
          }
        ]
      })
    }
  })
}

function goToAddress() {
  participacaoStore.setStep(4)
}

// --- Endereço (resgate, só quando ganhou) ---
const { onInvalidSubmit } = useFormError()
const { loading: submittingAddress, run: runSubmitAddress } = useAsyncSubmit()
const { lookup, looking } = useCepLookup()
const addressFormRef = ref<typeof Form | null>(null)

const CAMPOS_CEP = ['rua', 'bairro', 'cidade', 'estado'] as const

async function onCepBlur(event: FocusEvent) {
  const cep = (event.target as HTMLInputElement).value
  if (onlyDigits(cep).length !== 8) return

  const found = await lookup(cep)
  if (!found) return

  addressFormRef.value?.setValues(
    {
      rua: found.rua,
      bairro: found.bairro,
      cidade: found.cidade,
      estado: found.estado
    },
    false
  )
  CAMPOS_CEP.forEach((campo) => addressFormRef.value?.validateField(campo))
}

function onAddressSubmit(values: GenericObject) {
  runSubmitAddress(async () => {
    const payload = {
      participacaoId: participacaoStore.idParticipacao?.toString() ?? '',
      Telefone: onlyDigits(values.celular),
      Anexo: values.anexo,
      'Endereco.Cep': onlyDigits(values.cep),
      'Endereco.Rua': values.rua.trim(),
      'Endereco.Numero': values.numero.trim(),
      'Endereco.Bairro': values.bairro.trim(),
      'Endereco.Estado': values.estado,
      'Endereco.Cidade': values.cidade.trim(),
      'Endereco.Complemento': values.complemento?.trim() ?? ''
    }

    await useFetchData('/Endereco/Cadastrar', {
      method: 'POST',
      body: toFormData(payload),
      requiresAuth: true
    })

    participacaoStore.invalidate()
    notificationModalStore.openModal({
      title: 'Sua nota foi enviada com sucesso!',
      description:
        'Agora sua nota passará por <span class="font-bold text-(--color-brand-primary)">moderação e em até XX dias</span> você receberá um e-mail de atualização da validação da nota.',
      dismissible: false,
      closeIcon: false,
      actions: [
        {
          label: 'Ir para extrato',
          handler: async () => {
            await navigateTo('/extrato')
            notificationModalStore.closeModal()
          }
        }
      ]
    })
  })
}
</script>

<template>
  <main
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <div
        class="mx-auto max-w-[540px] rounded-xl bg-white px-6 py-8 text-center"
      >
        <!-- Reveal -->
        <template v-if="participacaoStore.step !== 4">
          <header class="mb-10">
            <h1
              class="text-h2 font-bold text-(--color-brand-primary) uppercase"
            >
              Abra sua Pringles<sup>®</sup> e descubra seu prêmio
            </h1>
          </header>

          <div v-if="!reward" class="flex flex-col items-center gap-6">
            <!-- TODO: animação/GIF real de abertura da lata assim que o design chegar. -->
            <div
              class="text-body-sm flex h-40 w-40 items-center justify-center rounded-full bg-(--color-brand-accent-purple) text-white"
            >
              Lata Pringles
            </div>
            <AppButton
              variant="accent"
              block
              :loading="opening"
              @click="openLata"
            >
              {{ opening ? 'Abrindo...' : 'Abrir' }}
            </AppButton>
          </div>

          <div
            v-else-if="reward !== 'naofoidessavez'"
            class="flex flex-col items-center gap-6"
          >
            <h2
              class="text-h3 font-bold text-(--color-brand-accent-purple) uppercase"
            >
              Parabéns! Você ganhou {{ reward }}!
            </h2>
            <AppButton variant="accent" block @click="goToAddress"
              >Resgatar prêmio</AppButton
            >
          </div>
        </template>

        <!-- Endereço / resgate -->
        <template v-else>
          <header class="mb-10 text-left">
            <h1
              class="text-h2 font-bold text-(--color-brand-primary) uppercase"
            >
              Informe seus dados de contato
            </h1>
            <p class="text-body-base text-(--color-brand-neutral-700)">
              Estes dados serão utilizados para enviar seu prêmio até você.
            </p>
          </header>
          <VeeForm
            ref="addressFormRef"
            :validation-schema="addressSchema"
            class="flex flex-col gap-6 text-left"
            @submit="onAddressSubmit"
            @invalid-submit="onInvalidSubmit"
          >
            <div class="flex items-end gap-4">
              <AppInput
                name="cep"
                label="CEP"
                :mask-input="MASK_CEP"
                placeholder="00000-000"
                input-mode="numeric"
                :loading="looking"
                class="flex-1"
                is-required
                @blur="onCepBlur"
              />
              <a
                class="text-body-sm text-(--color-brand-primary) hover:underline"
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                Não sei meu CEP
              </a>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
              <AppInput
                name="rua"
                label="Rua / Avenida"
                :loading="looking"
                class="md:col-span-3"
                is-required
              />
              <AppInput name="numero" label="Número" is-required />
            </div>
            <AppInput
              name="complemento"
              label="Complemento"
              placeholder="Casa, apartamento, bloco"
            />
            <AppInput
              name="bairro"
              label="Bairro"
              :loading="looking"
              is-required
            />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AppInput
                name="cidade"
                label="Cidade"
                :loading="looking"
                is-required
              />
              <AppSelect
                name="estado"
                label="Estado"
                :options="UF_OPTIONS"
                :loading="looking"
                is-required
              />
            </div>
            <AppInput
              name="celular"
              label="Celular"
              :mask-input="MASK_PHONE"
              input-mode="numeric"
              is-required
            />
            <AppUpload name="anexo" />
            <AppButton
              type="submit"
              variant="secondary"
              block
              :loading="submittingAddress"
              >Enviar</AppButton
            >
          </VeeForm>
        </template>
      </div>
    </div>
  </main>
</template>
