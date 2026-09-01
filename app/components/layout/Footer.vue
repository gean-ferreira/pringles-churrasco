<script setup lang="ts">
import { footerNavigation } from '~/utils/datas/footerNavigation.data'
import { footerSocial } from '~/utils/datas/footerSocial.data'
import { LINK_POLITICA_PRIVACIDADE } from '~/utils/links'
import { promotionName } from '~/utils/constants/seo.constant'

function toggleCookiePolicy() {
  if (typeof window !== 'undefined' && window.OneTrust) {
    window.OneTrust.ToggleInfoDisplay()
  }
}
</script>

<template>
  <footer class="bg-(--color-brand-primary)">
    <div class="h-1 w-full bg-(--color-brand-secondary)" />
    <div class="h-1 w-full bg-(--color-brand-accent-purple)" />
    <div class="h-1 w-full bg-(--color-brand-complementary)" />
    <div class="container py-14 text-center lg:text-left">
      <div class="mb-8 flex flex-col items-center gap-8 text-center lg:flex-row lg:gap-16">
        <p class="text-h3 font-bold uppercase text-white">{{ promotionName }}</p>
        <nav class="lg:mr-auto">
          <ul class="flex flex-col gap-4 lg:flex-row">
            <li v-for="item in footerNavigation" :key="item.label">
              <AppNavLink :to="item.path" class="text-body-sm uppercase !text-white hover:!text-(--color-brand-secondary)">
                {{ item.label }}
              </AppNavLink>
            </li>
            <li>
              <button
                type="button"
                class="text-body-sm uppercase text-white transition-colors hover:text-(--color-brand-secondary)"
                @click="toggleCookiePolicy"
              >
                Política de cookies
              </button>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="LINK_POLITICA_PRIVACIDADE"
                class="text-body-sm uppercase text-white transition-colors hover:text-(--color-brand-secondary)"
              >
                Aviso de privacidade
              </a>
            </li>
          </ul>
        </nav>
        <ul class="flex gap-4">
          <li v-for="item in footerSocial" :key="item.name">
            <a
              class="flex"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="item.name"
              :title="item.name"
            >
              <IconInstagram v-if="item.icon === 'Instagram'" class="size-10 text-white transition-colors hover:text-(--color-brand-secondary)" />
              <IconYoutube v-else-if="item.icon === 'Youtube'" class="size-10 text-white transition-colors hover:text-(--color-brand-secondary)" />
              <IconTiktok v-else-if="item.icon === 'Tiktok'" class="size-10 text-white transition-colors hover:text-(--color-brand-secondary)" />
              <IconFacebook v-else-if="item.icon === 'Facebook'" class="size-10 text-white transition-colors hover:text-(--color-brand-secondary)" />
            </a>
          </li>
        </ul>
      </div>
      <!-- TODO: texto legal (datas de participação, nº de autorização SPA/ME, regulamento) — pendente do jurídico da campanha. -->
      <p class="w-full max-w-[1150px] text-body-xs text-white">
        REPLACE_TEXTO_LEGAL_RODAPE — datas de participação, autorização SPA/ME e link do regulamento completo.
      </p>
    </div>
  </footer>
</template>
