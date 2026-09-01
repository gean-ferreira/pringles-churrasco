<script setup lang="ts">
export type AccordionItem = { question: string; answer: string }
defineProps<{ items: AccordionItem[] }>()
const openIndex = ref<number | null>(null)
function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="overflow-hidden rounded-xl bg-(--color-brand-primary)"
    >
      <button
        type="button"
        class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-6 text-left"
        @click="toggle(index)"
      >
        <span class="text-body-base font-semibold text-white">{{ item.question }}</span>
        <IconChevron
          class="size-5 shrink-0 text-white transition-transform duration-300"
          :class="openIndex === index ? 'rotate-180' : ''"
        />
      </button>
      <Transition
        enter-active-class="transition-all duration-200 ease-out overflow-hidden"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[400px] opacity-100"
        leave-active-class="transition-all duration-200 ease-in overflow-hidden"
        leave-from-class="max-h-[400px] opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="openIndex === index" class="px-6 pb-6 text-body-base font-normal text-white">
          {{ item.answer }}
        </div>
      </Transition>
    </div>
  </div>
</template>
