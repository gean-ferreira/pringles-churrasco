<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: 'Dê um POP com Pringles'
})
</script>

<template>
  <div
    aria-hidden="true"
    class="flex h-10 items-center overflow-hidden bg-transparent md:h-20"
  >
    <div
      class="animate-marquee flex w-max shrink-0 items-center gap-8 motion-reduce:animate-none md:gap-16"
    >
      <template v-for="n in 2" :key="n">
        <div class="flex shrink-0 items-center gap-8 md:gap-16">
          <template v-for="i in 10" :key="i">
            <IconStar class="size-4 shrink-0 text-white md:size-8" />
            <span
              class="text-h4 md:text-h1 text-shadow-comic-marquee shrink-0 whitespace-nowrap text-(--color-brand-secondary) uppercase"
            >
              {{ label }}<sup>®</sup>
            </span>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
