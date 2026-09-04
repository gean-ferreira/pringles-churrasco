<script setup lang="ts">
useSeoMeta({
  title: 'Página não encontrada — Pringles Churrasco',
  robots: 'noindex, nofollow'
})

function backToHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <section
      class="relative overflow-hidden bg-(--color-brand-accent-green) pt-(--header-height)"
    >
      <AppBgPattern />

      <div
        class="relative container flex flex-col items-center gap-5 py-25 text-center xl:gap-10"
      >
        <div class="flex items-center justify-center gap-3 xl:gap-6">
          <IconStar class="size-8 shrink-0 text-white xl:size-14" />
          <p
            class="text-display xl:text-display-lg text-shadow-comic xl:text-shadow-comic-lg text-(--color-brand-secondary) uppercase"
          >
            404
          </p>
          <IconStar class="size-8 shrink-0 text-white xl:size-14" />
        </div>

        <div class="mx-auto flex max-w-[846px] flex-col items-center gap-4">
          <h1 class="text-h3 xl:text-h2 text-white uppercase">
            Ops! Página não encontrada
          </h1>
          <p class="text-body-sm text-white">
            A página que você está tentando acessar não existe ou foi movida.
            <br class="hidden xl:block" />Volte para a página inicial e continue
            sua participação.
          </p>
        </div>

        <AppButton
          variant="secondary"
          block
          class="mx-auto max-w-[343px] xl:max-w-[384px]"
          @click="backToHome"
        >
          Voltar para a home
        </AppButton>
      </div>

      <AppInfiniteMarquee />
    </section>
  </NuxtLayout>
</template>
