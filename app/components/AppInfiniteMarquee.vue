<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: 'Dê um POP com Pringles'
})
</script>

<template>
  <div
    aria-hidden="true"
    class="flex items-center overflow-hidden bg-transparent py-2 xl:py-4"
  >
    <div
      class="animate-marquee flex w-max shrink-0 items-center gap-8 motion-reduce:animate-none xl:gap-16"
    >
      <template v-for="n in 2" :key="n">
        <div class="flex shrink-0 items-center gap-8 xl:gap-16">
          <template v-for="i in 10" :key="i">
            <IconStar class="size-4 shrink-0 text-white xl:size-8" />
            <span
              class="text-h4 xl:text-h1 text-shadow-comic-marquee shrink-0 whitespace-nowrap text-(--color-brand-secondary) uppercase"
            >
              {{ label }}<sup>®</sup>
            </span>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
