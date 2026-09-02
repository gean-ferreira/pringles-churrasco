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

const numeroSorteColumns: TableColumn[] = [
  { key: 'dataCadastro', label: 'Data' },
  { key: 'pincode', label: 'Pin Code' },
  { key: 'numeroSorte', label: 'Número da sorte' }
]

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
          :rows="
            extratoStore.participacoes as unknown as Record<string, unknown>[]
          "
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

        <div
          v-if="isLoading"
          class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-primary-dark)"
        />
        <AppTable
          v-else
          title="Meus números da sorte"
          :columns="numeroSorteColumns"
          :rows="
            extratoStore.numerosSorte as unknown as Record<string, unknown>[]
          "
          empty-text="Você ainda não possui números da sorte aprovados/cadastrados."
        />
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
