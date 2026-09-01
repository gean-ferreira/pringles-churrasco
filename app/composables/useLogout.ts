import { useAuthStore } from '~/stores/auth.store'
import { useUserStore } from '~/stores/user.store'
import { useExtratoStore } from '~/stores/extrato.store'
import { useParticipacaoStore } from '~/stores/participacao.store'

export function useLogout() {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const extratoStore = useExtratoStore()
  const participacaoStore = useParticipacaoStore()

  function clearSession() {
    authStore.logout()
    userStore.clearUser()
    extratoStore.invalidate()
    participacaoStore.invalidate() // gap encontrado no kellanova: não limpava no logout
  }

  async function logout(redirectTo = '/') {
    clearSession()
    await navigateTo(redirectTo)
  }

  return { logout, clearSession }
}
