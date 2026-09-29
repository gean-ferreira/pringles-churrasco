<script setup lang="ts">
import type {
  ApiExtractItem,
  GetExtractResponse,
  Participacao,
  ParticipacaoStatus
} from '~/types/extrato'
import type { TableColumn } from '~/types/table'
import { useExtratoStore } from '~/stores/extrato.store'

const API_STATUS = {
  EM_ANALISE: 1,
  APROVADO_AUTO: 2,
  REPROVADO_AUTO: 3,
  APROVADO: 4,
  REPROVADO: 5
} as const

const STATUS_BY_ID: Record<number, ParticipacaoStatus> = {
  [API_STATUS.EM_ANALISE]: 'EM ANÁLISE',
  [API_STATUS.APROVADO_AUTO]: 'APROVADO',
  [API_STATUS.REPROVADO_AUTO]: 'REPROVADO',
  [API_STATUS.APROVADO]: 'APROVADO',
  [API_STATUS.REPROVADO]: 'REPROVADO'
}

function toParticipacao(item: ApiExtractItem): Participacao {
  return {
    dataCadastro: item.createdAt,
    pincode: item.pinCode,
    status: STATUS_BY_ID[item.status] ?? 'EM ANÁLISE',
    premio: item.instantWin || '-',
    motivo: item.rejectionReason ?? undefined
  }
}

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
  { key: 'status', label: 'Status', type: 'status' }
]

onMounted(async () => {
  if (extratoStore.isLoaded) {
    isLoading.value = false
    return
  }
  try {
    const res = await useFetchData<GetExtractResponse>('/User/GetExtract', {
      method: 'GET',
      requiresAuth: true
    })
    extratoStore.setExtrato(res.content.extract.map(toParticipacao))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section
    class="relative overflow-hidden bg-(--color-brand-accent-green) pt-14 md:pt-25"
  >
    <AppBgPattern />
    <div class="relative container flex flex-col items-center gap-10">
      <header class="flex flex-col items-center gap-2 text-center">
        <h1
          class="text-h2 text-shadow-comic text-stroke-comic xl:text-h1 text-(--color-brand-secondary) uppercase"
        >
          Meu extrato
        </h1>
      </header>

      <div class="flex w-full flex-col gap-8 pb-14 xl:gap-10 xl:pb-25">
        <div
          v-if="isLoading"
          class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-neutral-100)"
        />
        <AppTable
          v-else
          variant="highlight"
          title="Premiação Instantânea"
          :columns="participacaoColumns"
          :rows="
            extratoStore.participacoes as unknown as Record<string, unknown>[]
          "
          empty-text="Você ainda não possui nota<br/> cadastrada nessa promoção."
        >
          <template #cell-status="{ row }">
            <div class="flex items-center gap-3">
              <AppStatusBadge :status="String(row.status)" />
              <button
                v-if="row.status === 'REPROVADO'"
                type="button"
                class="text-body-sm text-(--color-brand-primary) uppercase hover:underline"
                @click="openDetails(row as unknown as Participacao)"
              >
                Ver detalhes
              </button>
            </div>
          </template>
        </AppTable>

        <AppButton
          to="/cadastro-nota"
          variant="secondary"
          class="w-full max-w-[382px] self-center"
        >
          Cadastrar PIN Code
        </AppButton>
      </div>
    </div>

    <AppInfiniteMarquee />

    <ExtratoReprovacaoModal
      :open="isDetailsOpen"
      :participacao="selected"
      @update:open="closeDetails"
    />
  </section>
</template>
