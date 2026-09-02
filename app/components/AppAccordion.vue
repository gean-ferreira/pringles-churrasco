<script setup lang="ts">
export type AccordionItem = { question: string; answer: string }
defineProps<{ items: AccordionItem[] }>()
const openIndex = ref<number | null>(null)
function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="overflow-hidden rounded-xl border-2 border-(--color-brand-outline) bg-(--color-brand-neutral-50) drop-shadow-[-1px_3px_0px_var(--color-brand-outline)]"
    >
      <button
        type="button"
        class="flex w-full cursor-pointer items-center gap-4 border-b-2 border-(--color-brand-outline) p-4 text-left transition-colors"
        :class="openIndex === index ? 'bg-(--color-brand-accent-green)' : 'bg-white'"
        :aria-expanded="openIndex === index"
        @click="toggle(index)"
      >
        <span
          class="flex-1 text-body-base font-bold"
          :class="openIndex === index ? 'text-white' : 'text-(--color-brand-outline)'"
        >
          {{ item.question }}
        </span>
        <span
          class="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border-2 border-(--color-brand-outline) bg-(--color-brand-secondary) drop-shadow-[-1px_3px_0px_var(--color-brand-outline)]"
        >
          <IconPlus v-if="openIndex !== index" class="size-[18px] text-(--color-brand-outline)" />
          <IconMinus v-else class="size-[18px] text-(--color-brand-outline)" />
        </span>
      </button>
      <!-- grid-rows 0fr->1fr acompanha a altura real do texto — um max-height fixo (chutado)
           descasava do conteúdo e fazia a caixa "pular" de tamanho ao abrir/fechar. -->
      <div
        class="grid transition-[grid-template-rows] duration-200 ease-in-out"
        :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        :aria-hidden="openIndex !== index"
      >
        <div class="overflow-hidden">
          <p class="bg-(--color-brand-neutral-50) p-4 text-body-sm text-(--color-brand-neutral-800)">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
