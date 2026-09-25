<script setup lang="ts">
import { url } from '~/utils/constants/seo.constant'
import { NOVOS_SABORES_DATA } from '~/utils/datas/novosSabores.data'
import { LINK_ONDE_ENCONTRAR } from '~/utils/links'

definePageMeta({ name: 'Novos Sabores' })

useSeoMeta({
  title: 'Novos Sabores — Pringles Churrasco',
  description: 'Conheça os novos sabores Pringles que participam da promoção.',
  ogTitle: 'Novos Sabores — Pringles Churrasco',
  ogDescription:
    'Conheça os novos sabores Pringles que participam da promoção.',
  ogUrl: `${url}/novos-sabores`,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${url}/novos-sabores` }] })
</script>

<template>
  <div class="bg-(--color-brand-accent-green)">
    <section
      class="relative overflow-x-clip bg-(--color-brand-outline) bg-[url('/images/novos-sabores-kv-bg.jpg')] bg-cover bg-center pt-14 xl:pt-28"
    >
      <AppBgPattern :opacity="40" />

      <div
        class="relative container xl:grid xl:grid-cols-12 xl:items-center xl:gap-8"
      >
        <div
          class="relative z-10 mx-auto max-w-[260px] xl:col-span-5 xl:mx-0 xl:max-w-none"
        >
          <IconStar
            aria-hidden="true"
            class="absolute -top-1 -left-1 size-6 text-white xl:hidden"
          />
          <IconStar
            aria-hidden="true"
            class="absolute -top-1 -right-1 size-6 text-white xl:hidden"
          />
          <h1
            class="text-h2 text-shadow-comic text-stroke-comic xl:text-h1-xl pb-16 text-center font-bold text-white uppercase xl:text-left xl:text-(--color-brand-secondary)"
          >
            Conheça os sabores Pringles<sup>®</sup> Churras BR
          </h1>
        </div>

        <div class="relative mt-8 xl:col-span-7 xl:mt-0 xl:self-end">
          <div class="relative mx-auto max-w-[258px] xl:max-w-[590px]">
            <div class="pointer-events-none absolute inset-0">
              <div
                aria-hidden="true"
                class="animate-fork-wobble-left pointer-events-none absolute top-10 -left-6 h-[232px] w-[120px] origin-bottom -translate-y-1/2 bg-[url('/images/fale-conosco-garfo.png')] bg-contain bg-no-repeat motion-reduce:animate-none xl:top-1/2 xl:-left-1/3 xl:h-[521px] xl:w-[269px]"
              />
              <div
                aria-hidden="true"
                class="animate-fork-wobble-right pointer-events-none absolute top-10 -right-6 h-[232px] w-[120px] origin-bottom -translate-y-1/2 bg-[url('/images/fale-conosco-garfo.png')] bg-contain bg-bottom bg-no-repeat motion-reduce:animate-none xl:top-1/2 xl:-right-1/3 xl:h-[521px] xl:w-[269px]"
              />
            </div>

            <img
              src="/images/novos-sabores-latas.png"
              alt="Latas Pringles sabores Costela na brasa, Picanha no alho e Linguiça com vinagrete"
              width="590"
              height="696"
              class="relative z-10 mx-auto -mb-[6%] h-auto w-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-14 xl:py-25">
      <AppBgPattern />

      <div class="relative container flex flex-col gap-8">
        <article
          v-for="(flavor, index) in NOVOS_SABORES_DATA"
          :key="flavor.slug"
          class="comic-chrome-lg stack-card flex flex-col items-center gap-8 rounded-xl bg-(--color-brand-secondary) px-6 py-10 text-center xl:flex-row xl:items-center xl:justify-center xl:gap-10 xl:p-10 xl:text-left"
          :style="{ zIndex: index + 1 }"
        >
          <header class="flex flex-col items-center xl:hidden">
            <p class="text-h3 font-bold text-(--color-brand-outline) uppercase">
              Sabor
            </p>
            <p
              class="text-h2 text-shadow-comic text-stroke-comic xl:text-h1-xl font-bold text-white uppercase"
            >
              {{ flavor.name }}
            </p>
            <p
              class="text-body-lg text-shadow-comic text-stroke-comic xl:text-h1-lg font-bold text-white uppercase"
            >
              {{ flavor.subtitle }}
            </p>
          </header>

          <div
            class="animate-can-bob shrink-0 motion-reduce:animate-none"
            :style="{ animationDelay: `${index * 0.4}s` }"
          >
            <img
              :src="flavor.image"
              :alt="`Lata Pringles sabor ${flavor.name} ${flavor.subtitle}`"
              width="140"
              height="417"
              loading="lazy"
              class="h-auto w-[64px] -rotate-[15deg] drop-shadow-xl xl:w-[140px]"
            />
          </div>

          <div
            class="flex flex-col items-center gap-8 xl:max-w-[480px] xl:items-start xl:gap-6"
          >
            <header class="hidden xl:flex xl:flex-col xl:items-start">
              <p
                class="text-h3 font-bold text-(--color-brand-outline) uppercase"
              >
                Sabor
              </p>
              <p
                class="text-h2 text-shadow-comic text-stroke-comic xl:text-h1-xl font-bold text-white uppercase"
              >
                {{ flavor.name }}
              </p>
              <p
                class="text-body-lg text-shadow-comic text-stroke-comic xl:text-h1-lg font-bold text-white uppercase"
              >
                {{ flavor.subtitle }}
              </p>
            </header>
            <p
              class="text-body-sm xl:text-body-base text-(--color-brand-outline)"
            >
              {{ flavor.description }}
            </p>

            <AppButton
              :to="LINK_ONDE_ENCONTRAR"
              target="_blank"
              rel="noopener noreferrer"
              variant="success"
              block
              class="xl:w-auto"
            >
              Onde encontrar
            </AppButton>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
