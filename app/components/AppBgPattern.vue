<script setup lang="ts">
withDefaults(
  defineProps<{ opacity?: 5 | 10 | 15 | 20 | 40; sticky?: boolean }>(),
  { opacity: 5, sticky: false }
)
</script>

<template>
  <!-- overflow-clip (e não hidden) para não criar um scroll container e quebrar o sticky interno -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-clip"
  >
    <div
      class="bg-[url('/images/bg-pattern.png')] bg-size-[1920px_1003px] bg-repeat"
      :class="[
        sticky ? 'sticky top-0 h-dvh w-full' : 'absolute inset-0',
        {
          'opacity-5': opacity === 5,
          'opacity-10': opacity === 10,
          'opacity-15': opacity === 15,
          'opacity-20': opacity === 20,
          'opacity-40': opacity === 40
        }
      ]"
    />
  </div>
</template>
