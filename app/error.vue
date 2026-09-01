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
    <section class="relative min-h-screen overflow-hidden bg-(--color-brand-primary) pt-(--header-height)">
      <div class="container py-25 text-center">
        <div class="mx-auto max-w-[846px]">
          <p class="mb-2 text-body-lg text-white">Erro 404</p>
          <h1 class="page-title mb-4">
            Eita, página não<br />
            encontrada!
          </h1>
          <p class="mx-auto mb-12 w-full max-w-[406px] text-body-lg text-white">
            Enquanto isso, pegue sua Pringles<sup>®</sup> e continue navegando no nosso site.
          </p>
          <AppButton variant="secondary" block class="mx-auto max-w-[384px]" @click="backToHome">
            Voltar para a home
          </AppButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
