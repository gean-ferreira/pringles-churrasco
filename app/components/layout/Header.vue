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
const anchorSectionIds = headerNavigation
  .filter((item) => item.path.includes('#'))
  .map((item) => item.path.split('#')[1] ?? '')
const { isSectionActive } = useActiveSection(anchorSectionIds)

const route = useRoute()
const isAnchorActive = (sectionId: string) =>
  route.path === '/' && isSectionActive(sectionId)

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
  <header
    class="fixed inset-x-0 top-0 z-50 h-(--header-height) bg-(--color-brand-primary)"
  >
    <div
      class="container flex h-full items-start justify-between xl:justify-start xl:gap-14"
    >
      <NuxtLink to="/" class="z-50 pt-4" @click="header.closeMenu">
        <img
          src="/images/logo-pringles.png"
          alt="Pringles"
          width="70"
          height="88"
        />
      </NuxtLink>

      <button
        type="button"
        class="comic-chrome-sm flex items-center justify-center self-center rounded-xl bg-(--color-brand-secondary) p-3 text-(--color-brand-outline) xl:hidden"
        :aria-expanded="header.isOpen"
        aria-label="Abrir menu"
        @click="header.toggleMenu"
      >
        <IconClose v-if="header.isOpen" />
        <IconMenu v-else />
      </button>

      <nav
        class="fixed top-(--header-height) left-0 z-40 w-full overflow-y-auto bg-(--color-brand-primary-dark) transition-all duration-300 ease-in-out xl:static xl:h-auto xl:flex-1 xl:self-center xl:overflow-visible xl:bg-transparent"
        :class="
          header.isOpen
            ? 'h-[calc(100vh-var(--header-height))]'
            : 'h-0 xl:h-auto'
        "
        :aria-hidden="isMobile && !header.isOpen"
        :inert="isMobile && !header.isOpen"
      >
        <ul
          class="flex flex-col items-center gap-12 px-4 py-12 xl:flex-row xl:gap-4 xl:px-0 xl:py-0"
        >
          <ClientOnly>
            <li
              v-if="!authStore.isAuthenticated && !isPromotionFinished"
              class="block w-full xl:hidden"
              @click="header.closeMenu"
            >
              <AppButton to="/cadastro" variant="secondary" block
                >Participe já</AppButton
              >
            </li>
          </ClientOnly>

          <li
            v-for="item in headerNavigation"
            :key="item.label"
            @click="header.closeMenu"
          >
            <AppNavLink
              :to="item.path"
              :active="
                item.path.includes('#')
                  ? isAnchorActive(item.path.split('#')[1] ?? '')
                  : undefined
              "
            >
              {{ item.label }}
            </AppNavLink>
          </li>

          <ClientOnly>
            <li v-if="!authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/novos-sabores">Novos Sabores</AppNavLink>
            </li>
            <li
              v-if="authStore.isAuthenticated && !isPromotionFinished"
              @click="header.closeMenu"
            >
              <AppNavLink to="/cadastro-nota">Cadastrar PIN Code</AppNavLink>
            </li>
          </ClientOnly>

          <li @click="header.closeMenu">
            <AppNavLink to="/ganhadores">Ganhadores</AppNavLink>
          </li>

          <ClientOnly>
            <li v-if="authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/novos-sabores">Novos Sabores</AppNavLink>
            </li>
            <li v-if="authStore.isAuthenticated" @click="header.closeMenu">
              <AppNavLink to="/extrato">Meu extrato</AppNavLink>
            </li>

            <li
              aria-hidden="true"
              class="h-px w-[260px] bg-(--color-brand-primary-light) xl:hidden"
            />

            <li
              v-if="!authStore.isAuthenticated"
              class="xl:ml-auto"
              @click="header.closeMenu"
            >
              <AppNavLink to="/login">Login</AppNavLink>
            </li>
            <li
              v-if="!authStore.isAuthenticated && !isPromotionFinished"
              class="hidden xl:block"
              @click="header.closeMenu"
            >
              <AppButton to="/cadastro" variant="secondary"
                >Participe já</AppButton
              >
            </li>
            <li
              v-if="authStore.isAuthenticated"
              class="xl:ml-auto"
              @click="header.closeMenu"
            >
              <AppNavLink to="/editar-cadastro">Meu perfil</AppNavLink>
            </li>
            <li v-if="authStore.isAuthenticated">
              <button
                type="button"
                class="text-body-sm font-bold text-white uppercase transition-colors hover:text-(--color-brand-secondary)"
                @click="handleLogout"
              >
                Sair
              </button>
            </li>
          </ClientOnly>
        </ul>
      </nav>
    </div>
  </header>
</template>
