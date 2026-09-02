<script setup lang="ts">
import type { WinnerResponse, InstantPrizeWinner } from '~/types/winners'
import type { TableColumn } from '~/types/table'

const columns: TableColumn[] = [
  { key: 'nome', label: 'Nome' },
  { key: 'pincode', label: 'Pin Code' },
  { key: 'premio', label: 'Prêmio' }
]

const { status, data: response } = await useFetch<
  WinnerResponse<InstantPrizeWinner>
>(`${import.meta.env.VITE_BASE_API}/Ganhador/ConsultarGanhadores/VALE_BRINDE`, {
  key: 'instant-prize-key',
  lazy: true,
  server: false
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="status === 'pending' || status === 'error'"
      class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-neutral-100)"
    />
    <AppTable
      v-else
      title="Premiação instantânea"
      :columns="columns"
      :rows="
        (response?.ganhadores ?? []) as unknown as Record<string, unknown>[]
      "
      empty-text="Ainda não foram apurados os ganhadores da premiação instantânea."
    />
  </ClientOnly>
</template>
