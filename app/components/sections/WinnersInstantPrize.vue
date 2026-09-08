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

// TEMP-MOCK: só em dev — valida o scroll do AppTable (max-h-[377px]) com
// lista longa, independente de quantos ganhadores reais a API já tenha.
// Nunca entra em produção.
const MOCK_WINNERS: InstantPrizeWinner[] = [
  { nome: 'Ana P.', pincode: '0804074', premio: 'Kit churrasco Pringles' },
  { nome: 'Bruno S.', pincode: '5825684', premio: 'Squeeze Pringles' },
  { nome: 'Carla R.', pincode: '4471932', premio: 'Vale-compras R$ 100' },
  { nome: 'Diego M.', pincode: '3390281', premio: 'Kit churrasco Pringles' },
  { nome: 'Eduarda L.', pincode: '9012384', premio: 'Squeeze Pringles' },
  { nome: 'Felipe T.', pincode: '1128374', premio: 'Vale-compras R$ 100' },
  { nome: 'Gabriela A.', pincode: '6653921', premio: 'Kit churrasco Pringles' },
  { nome: 'Henrique O.', pincode: '2287461', premio: 'Squeeze Pringles' },
  { nome: 'Isabela F.', pincode: '7743210', premio: 'Vale-compras R$ 100' },
  { nome: 'João C.', pincode: '8801234', premio: 'Kit churrasco Pringles' },
  { nome: 'Karina D.', pincode: '3345678', premio: 'Squeeze Pringles' },
  { nome: 'Lucas B.', pincode: '5567891', premio: 'Vale-compras R$ 100' },
  { nome: 'Mariana G.', pincode: '9987654', premio: 'Kit churrasco Pringles' },
  { nome: 'Nicolas V.', pincode: '4432109', premio: 'Squeeze Pringles' },
  { nome: 'Olívia H.', pincode: '6678904', premio: 'Vale-compras R$ 100' }
]

const rows = computed(() =>
  import.meta.dev ? MOCK_WINNERS : (response.value?.ganhadores ?? [])
)
</script>

<template>
  <ClientOnly>
    <div
      v-if="status === 'pending' || status === 'error'"
      class="h-18 w-full animate-pulse rounded-lg bg-(--color-brand-neutral-100)"
    />
    <AppTable
      v-else
      variant="highlight"
      title="Premiação instantânea"
      :columns="columns"
      :rows="rows as unknown as Record<string, unknown>[]"
      empty-text="Ainda não foram apurados os ganhadores da premiação instantânea."
    />
  </ClientOnly>
</template>
