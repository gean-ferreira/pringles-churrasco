<script setup lang="ts">
import { headerNavigation } from '~/utils/datas/headerNavigation.data'
import { useHeaderStore } from '~/stores/header.store'
import { useAuthStore } from '~/stores/auth.store'
import { useLogout } from '~/composables/useLogout'
import { usePromotionStatus } from '~/composables/usePromotionStatus'
import { useActiveSection } from '~/composables/useActiveSection'

const header = useHeaderStore()
const authStore = useAuthStore()
const { logout } = useLogout()
const { isPromotionFinished } = usePromotionStatus()
const { isSectionActive } = useActiveSection()

const isMobile = ref(false)
function checkIsMobile() {
  if (import.meta.client) isMobile.value = window.innerWidth < 1280 // breakpoint xl do Tailwind
}
onMounted(checkIsMobile)

async function handleLogout() {
  header.closeMenu()
  await logout()
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 h-(--header-height) bg-(--color-brand-primary)">
    <div class="container flex h-full items-center justify-between">
      <NuxtLink to="/" class="z-50 text-h3 font-bold uppercase text-white" @click="header.closeMenu">
        Pringles Churrasco
      </NuxtLink>

      <button
        type="button"
        class="text-white xl:hidden"
        :aria-expanded="header.isOpen"
        aria-label="Abrir menu"
        @click="header.toggleMenu"
      >
        <IconClose v-if="header.isOpen" class="size-7" />
        <IconMenu v-else class="size-7" />
      </button>

      <nav
        class="fixed left-0 top-(--header-height) z-40 w-full overflow-y-auto bg-(--color-brand-primary-dark) transition-all duration-300 ease-in-out xl:static xl:h-auto xl:w-auto xl:overflow-visible xl:bg-transparent"
        :class="header.isOpen ? 'h-[calc(100vh-var(--header-height))]' : 'h-0 xl:h-auto'"
        :aria-hidden="isMobile && !header.isOpen"
        :inert="isMobile && !header.isOpen"
      >
        <ul class="flex flex-col items-center gap-8 px-4 py-12 xl:flex-row xl:gap-6 xl:px-0 xl:py-0">
          <ClientOnly>
            <li v-if="!authStore.isAuthenticated && !isPromotionFinished" class="block w-full xl:hidden" @click="header.closeMenu">
              <AppButton to="/cadastro" variant="secondary" block>Participe</AppButton>
            </li>
          </ClientOnly>

          <li v-for="item in headerNavigation" :key="item.label" @click="header.closeMenu">
            <AppNavLink :to="item.path" :active="item.path.includes('#') ? isSectionActive(item.path.split('#')[1] ?? '') : undefined">
              {{ item.label }}
            </AppNavLink>
          </li>

          <ClientOnly>
            <li v-if="authStore.isAuthenticated && !isPromotionFinished" @click="header.closeMenu">
              <AppNavLink to="/cadastro-nota">Cadastrar nota</AppNavLink>
            </li>
            <li v-if="authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/extrato">Meu extrato</AppNavLink>
            </li>
            <li v-if="!authStore.isAuthenticated && !isPromotionFinished" class="hidden xl:block" @click="header.closeMenu">
              <AppButton to="/cadastro" variant="secondary">Participe</AppButton>
            </li>
            <li v-if="authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/editar-cadastro">Meu perfil</AppNavLink>
            </li>
            <li v-if="!authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/login">Login</AppNavLink>
            </li>
            <li v-if="authStore.isAuthenticated">
              <button type="button" class="text-body-base font-medium uppercase text-white transition-colors hover:text-(--color-brand-secondary)" @click="handleLogout">
                Sair
              </button>
            </li>
          </ClientOnly>
        </ul>
      </nav>
    </div>
  </header>
</template>
