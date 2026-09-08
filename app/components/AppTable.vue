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
const isHighlight = computed(() => props.variant === 'highlight')
</script>
<template>
  <div
    class="overflow-hidden"
    :class="
      isHighlight
        ? 'comic-chrome-lg rounded-2xl'
        : 'rounded-lg border border-(--color-brand-neutral-100)'
    "
  >
    <div
      v-if="title"
      class="text-center font-bold uppercase"
      :class="
        isHighlight
          ? 'text-h4 border-b-4 border-(--color-brand-outline) bg-(--color-brand-secondary) px-2 py-4 text-(--color-brand-outline)'
          : 'text-body-lg bg-(--color-brand-primary) px-4 py-4 text-white'
      "
    >
      {{ title }}
    </div>
    <div class="max-h-[377px] overflow-auto">
      <table
        class="w-full min-w-[520px] table-auto border-collapse md:min-w-0 md:table-fixed"
      >
        <thead v-if="showHeader">
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="col.key"
              class="text-body-sm sticky top-0 z-10 overflow-hidden text-ellipsis whitespace-nowrap"
              :class="
                isHighlight
                  ? [
                      'bg-(--color-brand-neutral-50) px-6 py-3 text-left font-bold text-(--color-brand-neutral-800)',
                      index < columns.length - 1 &&
                        'border-r border-(--color-brand-neutral-100)'
                    ]
                  : ''
              "
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="bg-white">
            <td
              v-for="(col, colIndex) in columns"
              :key="col.key"
              class="overflow-hidden border-t border-(--color-brand-neutral-100) text-ellipsis whitespace-nowrap"
              :class="
                isHighlight
                  ? [
                      'text-body-sm px-6 py-3.5 text-(--color-brand-neutral-800)',
                      colIndex < columns.length - 1 &&
                        'border-r border-(--color-brand-neutral-100)'
                    ]
                  : ''
              "
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
              class="text-body-lg bg-white px-6 py-14 text-center font-bold text-(--color-brand-outline) uppercase"
              v-html="emptyText"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
