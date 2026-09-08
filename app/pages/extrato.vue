<script setup lang="ts">
import type { GetExtratoResponse, Participacao } from '~/types/extrato'
import type { TableColumn } from '~/types/table'
import { useExtratoStore } from '~/stores/extrato.store'

definePageMeta({ middleware: 'auth', name: 'Extrato' })

useSeoMeta({
  title: 'Meu Extrato — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

const extratoStore = useExtratoStore()
const isLoading = ref(true)

const isDetailsOpen = ref(false)
const selected = ref<Participacao | null>(null)

function openDetails(item: Participacao) {
  selected.value = item
  isDetailsOpen.value = true
}
function closeDetails() {
  isDetailsOpen.value = false
}

const participacaoColumns: TableColumn[] = [
  { key: 'dataCadastro', label: 'Data' },
  { key: 'pincode', label: 'Pin Code' },
  { key: 'premio', label: 'Prêmio' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: '_action', label: '' }
]

// TEMP-MOCK: só em dev e só enquanto a extratoStore não tem participações —
// valida o scroll do AppTable (max-h-[377px]) com lista longa. Nunca entra em produção.
const MOCK_PARTICIPACOES: Participacao[] = [
  {
    dataCadastro: '01/09/2026',
    pincode: '0804074',
    status: 'APROVADO',
    premio: 'Kit churrasco Pringles'
  },
  {
    dataCadastro: '02/09/2026',
    pincode: '5825684',
    status: 'EM ANÁLISE',
    premio: 'Squeeze Pringles'
  },
  {
    dataCadastro: '03/09/2026',
    pincode: '4471932',
    status: 'REPROVADO',
    premio: 'Vale-compras R$ 100',
    motivo: 'Cupom ilegível'
  },
  {
    dataCadastro: '04/09/2026',
    pincode: '3390281',
    status: 'APROVADO',
    premio: 'Kit churrasco Pringles'
  },
  {
    dataCadastro: '05/09/2026',
    pincode: '9012384',
    status: 'EM ANÁLISE',
    premio: 'Squeeze Pringles'
  },
  {
    dataCadastro: '06/09/2026',
    pincode: '1128374',
    status: 'REPROVADO',
    premio: 'Vale-compras R$ 100',
    motivo: 'Nota fiscal fora do período da promoção'
  },
  {
    dataCadastro: '07/09/2026',
    pincode: '6653921',
    status: 'APROVADO',
    premio: 'Kit churrasco Pringles'
  },
  {
    dataCadastro: '08/09/2026',
    pincode: '2287461',
    status: 'EM ANÁLISE',
    premio: 'Squeeze Pringles'
  },
  {
    dataCadastro: '09/09/2026',
    pincode: '7743210',
    status: 'APROVADO',
    premio: 'Vale-compras R$ 100'
  },
  {
    dataCadastro: '10/09/2026',
    pincode: '8801234',
    status: 'REPROVADO',
    premio: 'Kit churrasco Pringles',
    motivo: 'Produto não participante'
  },
  {
    dataCadastro: '11/09/2026',
    pincode: '3345678',
    status: 'APROVADO',
    premio: 'Squeeze Pringles'
  },
  {
    dataCadastro: '12/09/2026',
    pincode: '5567891',
    status: 'EM ANÁLISE',
    premio: 'Vale-compras R$ 100'
  },
  {
    dataCadastro: '13/09/2026',
    pincode: '9987654',
    status: 'APROVADO',
    premio: 'Kit churrasco Pringles'
  },
  {
    dataCadastro: '14/09/2026',
    pincode: '4432109',
    status: 'REPROVADO',
    premio: 'Squeeze Pringles',
    motivo: 'Cupom duplicado'
  },
  {
    dataCadastro: '15/09/2026',
    pincode: '6678904',
    status: 'APROVADO',
    premio: 'Vale-compras R$ 100'
  }
]

const participacoesRows = computed(() =>
  import.meta.dev && extratoStore.participacoes.length === 0
    ? MOCK_PARTICIPACOES
    : extratoStore.participacoes
)

onMounted(async () => {
  if (extratoStore.isLoaded) {
    isLoading.value = false
    return
  }
  try {
    const res = await useFetchData<GetExtratoResponse>(
      '/Participacao/ExtratoCupom',
      {
        method: 'GET',
        requiresAuth: true
      }
    )
    extratoStore.setExtrato(res.extratoCupomDto)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section
    class="min-h-screen bg-(--color-brand-primary) pt-(--header-height) pb-25"
  >
    <div class="container pt-18">
      <header class="mb-12 text-center">
        <h1 class="page-title">Meu extrato</h1>
      </header>
      <main class="space-y-4 xl:space-y-10">
        <div
          v-if="isLoading"
          class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-primary-dark)"
        />
        <AppTable
          v-else
          title="Premiação Instantânea"
          :columns="participacaoColumns"
          :rows="participacoesRows as unknown as Record<string, unknown>[]"
          empty-text="Você ainda não possui premiação instantânea aprovada/cadastrada."
        >
          <template #cell-_action="{ row }">
            <button
              v-if="row.status === 'REPROVADO'"
              type="button"
              class="text-body-sm text-(--color-brand-primary) uppercase hover:underline"
              @click="openDetails(row as unknown as Participacao)"
            >
              Ver detalhes
            </button>
          </template>
        </AppTable>
      </main>
    </div>

    <AppModal
      :open="isDetailsOpen"
      title="Detalhes do status"
      @close="closeDetails"
    >
      <template v-if="selected">
        <img
          v-if="selected.imagemUrl"
          :src="selected.imagemUrl"
          alt="Imagem do cupom"
          class="max-h-[450px] w-full rounded object-contain"
        />
        <p class="text-body-base text-(--color-brand-neutral-700)">
          Cupom rejeitado pela moderação
        </p>
        <p class="text-body-base text-(--color-brand-neutral-700)">
          <span class="font-bold">Motivo:</span> {{ selected.motivo ?? '-' }}
        </p>
      </template>
    </AppModal>
  </section>
</template>
