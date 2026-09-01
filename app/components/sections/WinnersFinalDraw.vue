<script setup lang="ts">
import type { WinnerResponse, FinalDrawWinner } from '~/types/winners'
import type { TableColumn } from '~/types/table'

const columns: TableColumn[] = [
  { key: 'nome', label: 'Nome' },
  { key: 'local', label: 'Cidade' },
  { key: 'numeroSorteado', label: 'Nº da Sorte' },
  { key: 'premio', label: 'Prêmio' }
]

const { status, data: response } = await useFetch<WinnerResponse<FinalDrawWinner>>(
  `${import.meta.env.VITE_BASE_API}/Ganhador/ConsultarGanhadores/SORTEIO_FINAL`,
  { key: 'final-draw-key', lazy: true, server: false }
)
</script>

<template>
  <ClientOnly>
    <div v-if="status === 'pending' || status === 'error'" class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-neutral-100)" />
    <AppTable
      v-else
      title="Sorteio final"
      :columns="columns"
      :rows="(response?.ganhadores ?? []) as unknown as Record<string, unknown>[]"
      empty-text="Ainda não foram apurados os ganhadores do sorteio final."
    />
  </ClientOnly>
</template>
