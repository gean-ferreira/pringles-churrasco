<script setup lang="ts">
import type { Component } from 'vue'
import IconInstagram from '~/components/icon/Instagram.vue'
import IconYoutube from '~/components/icon/Youtube.vue'
import IconTiktok from '~/components/icon/Tiktok.vue'
import IconFacebook from '~/components/icon/Facebook.vue'
import { footerNavigation } from '~/utils/datas/footerNavigation.data'
import { footerSocial } from '~/utils/datas/footerSocial.data'
import { LINK_POLITICA_PRIVACIDADE } from '~/utils/links'
import type { FooterSocialIcon } from '~/types/footerSocial'

const socialIcons: Record<FooterSocialIcon, Component> = {
  Instagram: IconInstagram,
  Youtube: IconYoutube,
  Tiktok: IconTiktok,
  Facebook: IconFacebook
}

function toggleCookiePolicy() {
  if (typeof window !== 'undefined' && window.OneTrust) {
    window.OneTrust.ToggleInfoDisplay()
  }
}
</script>

<template>
  <footer class="bg-(--color-brand-primary)">
    <div class="container py-14 text-center xl:text-left">
      <div
        class="mb-8 flex flex-col items-center gap-8 text-center xl:flex-row xl:gap-16"
      >
        <NuxtImg
          src="/logo-pringles-footer.png"
          alt="Pringles"
          width="64"
          height="36"
          class="shrink-0"
        />
        <nav class="xl:mr-auto">
          <ul class="flex flex-col gap-4 xl:flex-row">
            <li v-for="item in footerNavigation" :key="item.label">
              <AppNavLink :to="item.path" :active="false">
                {{ item.label }}
              </AppNavLink>
            </li>
            <li>
              <button
                type="button"
                class="text-body-sm font-bold text-white uppercase transition-colors hover:text-(--color-brand-secondary)"
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
                class="text-body-sm font-bold text-white uppercase transition-colors hover:text-(--color-brand-secondary)"
              >
                Aviso de privacidade
              </a>
            </li>
          </ul>
        </nav>
        <ul class="flex gap-4">
          <li v-for="item in footerSocial" :key="item.name">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="item.name"
              :title="item.name"
              class="flex size-10 items-center justify-center rounded-xl bg-white transition-colors hover:bg-(--color-brand-secondary)"
            >
              <component :is="socialIcons[item.icon]" class="size-full" />
            </a>
          </li>
        </ul>
      </div>
      <!-- TODO: texto legal (datas de participação, nº de autorização SPA/ME, regulamento) — pendente do jurídico da campanha. -->
      <p class="text-body-xs w-full max-w-[1150px] text-center text-white">
        REPLACE_TEXTO_LEGAL_RODAPE — datas de participação, autorização SPA/ME e
        link do regulamento completo.
      </p>
    </div>
  </footer>
</template>
