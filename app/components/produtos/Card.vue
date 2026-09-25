<script setup lang="ts">
import type { Flavor } from '~/types/flavor'

defineProps<{ flavor: Flavor }>()

// Hover do Figma (Smart Animate 0.3s ease-out) — só no desktop.
const transition =
  'transition-[translate,scale,background-color] duration-300 ease-out motion-reduce:transition-none'
</script>

<template>
  <!-- Mobile: nome em cima + lata centralizada (gap 40px), sem hover.
       Desktop: coordenadas absolutas do Figma (390×560) + animação no hover. -->
  <article
    class="group relative flex h-[386px] w-[269px] shrink-0 snap-center flex-col items-center justify-center gap-4 overflow-hidden xl:block xl:h-[560px] xl:w-[390px]"
  >
    <div
      aria-hidden="true"
      class="absolute top-0 left-0 h-[560px] w-[390px] origin-top-left scale-[0.69] xl:scale-100"
    >
      <div
        class="card-produto-shape absolute inset-0 bg-(--color-brand-accent-green) xl:group-hover:-translate-x-[2px] xl:group-hover:translate-y-[2px] xl:group-hover:bg-(--color-brand-secondary)"
        :class="transition"
      >
        <div class="card-pattern" />
      </div>
    </div>

    <h3
      class="relative flex flex-col items-center font-bold text-white uppercase xl:absolute xl:top-[91px] xl:left-1/2 xl:w-[250px] xl:origin-top xl:-translate-x-1/2 xl:group-hover:translate-y-[290px] xl:group-hover:scale-[0.616]"
      :class="transition"
    >
      <span
        class="text-h3 xl:text-h1 flex h-[34px] w-[160px] items-center justify-center rounded-[2px] bg-(--color-brand-secondary) shadow-[3px_1px_0_0_var(--color-brand-outline)] [text-shadow:-3px_1px_0_var(--color-brand-outline)] xl:h-[46px] xl:w-[229px] xl:shadow-[4px_2px_0_0_var(--color-brand-outline)] xl:[text-shadow:-4px_2px_0_var(--color-brand-outline)]"
      >
        {{ flavor.name }}
      </span>
      <span
        class="text-body-base xl:text-body-lg -mt-[3px] flex h-[26px] items-center justify-center rounded-[2px] bg-(--color-brand-secondary) shadow-[3px_1px_0_0_var(--color-brand-outline)] [text-shadow:1.5px_1.5px_0_var(--color-brand-outline)] xl:h-[38px] xl:w-[191px] xl:shadow-[4px_2px_0_0_var(--color-brand-outline)] xl:[text-shadow:2px_2px_0_var(--color-brand-outline)]"
        :class="
          flavor.slug === 'linguica-com-vinagrete' ? 'w-[152px]' : 'w-[122px]'
        "
      >
        {{ flavor.subtitle }}
      </span>
    </h3>

    <img
      :src="flavor.image"
      :alt="`Lata Pringles sabor ${flavor.name} ${flavor.subtitle}`"
      width="227"
      height="728"
      loading="lazy"
      class="relative h-[256px] w-[80px] xl:absolute xl:top-[214px] xl:left-1/2 xl:h-[728px] xl:w-[227px] xl:-translate-x-1/2 xl:group-hover:-translate-y-[190px]"
      :class="transition"
    />

    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-0 left-0 h-[560px] w-[390px] origin-top-left scale-[0.69] xl:scale-100"
    >
      <img
        src="/images/home-card-produto-moldura.png"
        alt=""
        width="392"
        height="590"
        loading="lazy"
        class="absolute top-[2px] -left-px"
      />
    </div>
  </article>
</template>
