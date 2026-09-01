import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const authStore = useAuthStore()
  const isLoggedIn = computed(() => authStore.isAuthenticated)
  return { isLoggedIn }
}
