<script setup lang="ts">
withDefaults(defineProps<{ opacity?: 5 | 10 | 15 | 20 | 40 }>(), { opacity: 5 })
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 bg-[url('/images/bg-pattern.png')] [background-size:1920px_1003px] bg-repeat"
    :class="{
      'opacity-5': opacity === 5,
      'opacity-10': opacity === 10,
      'opacity-15': opacity === 15,
      'opacity-20': opacity === 20,
      'opacity-40': opacity === 40
    }"
  />
</template>
