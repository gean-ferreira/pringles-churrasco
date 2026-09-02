<script setup lang="ts">
import type { TableColumn, TableVariant } from '~/types/table'

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    rows: Record<string, unknown>[]
    variant?: TableVariant
    title?: string
    emptyText?: string
  }>(),
  { variant: 'default', emptyText: 'Nenhum registro encontrado.' }
)

const showHeader = computed(
  () => props.rows.length > 0 || props.variant === 'highlight'
)
</script>
<template>
  <div
    class="overflow-hidden rounded-lg border border-(--color-brand-neutral-100)"
  >
    <div
      v-if="title"
      class="text-body-lg bg-(--color-brand-primary) px-4 py-4 text-center font-bold text-white uppercase"
    >
      {{ title }}
    </div>
    <div class="max-h-[377px] overflow-auto">
      <!-- table-fixed (largura igual) só a partir do md. No mobile, table-auto:
           table-fixed ignora o conteúdo e a célula não corta overflow, então
           texto maior que a coluna vazava por trás da próxima. min-w mantém
           o scroll horizontal em vez de cortar/sobrepor texto. -->
      <table
        class="w-full min-w-[520px] table-auto border-collapse md:min-w-0 md:table-fixed"
      >
        <thead v-if="showHeader">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="text-body-sm sticky top-0 z-10 whitespace-nowrap"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="bg-white">
            <td
              v-for="col in columns"
              :key="col.key"
              class="border-t border-(--color-brand-neutral-100) whitespace-nowrap"
            >
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :index="index"
              >
                <AppStatusBadge
                  v-if="col.type === 'status'"
                  :status="String(row[col.key])"
                />
                <template v-else>{{ row[col.key] }}</template>
              </slot>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td
              :colspan="columns.length"
              class="text-body-lg bg-white text-center font-bold text-(--color-brand-primary) uppercase"
            >
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
