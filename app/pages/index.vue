<script setup lang="ts">
import { title, description, url } from '~/utils/constants/seo.constant'

definePageMeta({ name: 'Home' })

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${url}/og-image.jpg`,
  ogUrl: url,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: url }] })
</script>

<template>
  <div>
    <SectionsHeroBanner />
    <SectionsComoParticipar />
    <SectionsPremios />
    <SectionsDestaqueHome />
    <SectionsProdutosParticipantes />
    <SectionsBarraCtaMobile />
  </div>
</template>
