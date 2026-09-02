export const useAuthStore = defineStore('auth', () => {
  // useCookie, não um ref simples — um ref reseta a cada reload completo,
  // deslogando o usuário sempre que ele atualiza a página ou abre um link
  // protegido direto em vez de navegar até lá client-side.
  const token = useCookie<string | null>('auth_token', { default: () => null })
  const isAuthenticated = computed(() => !!token.value)

  function setToken(value: string) {
    token.value = value

    if (import.meta.client) {
      window.digitalData = {
        ...window.digitalData,
        user: {
          ...window.digitalData?.user,
          attributes: {
            ...window.digitalData?.user?.attributes,
            isLoggedIn: true
          },
          profile: {
            ...window.digitalData?.user?.profile,
            userType: 'Repeated user'
          }
        }
      }
    }
  }

  function logout() {
    token.value = null

    if (import.meta.client) {
      window.digitalData = {
        ...window.digitalData,
        user: {
          ...window.digitalData?.user,
          attributes: {
            ...window.digitalData?.user?.attributes,
            isLoggedIn: false
          },
          profile: {
            ...window.digitalData?.user?.profile,
            profileID: '',
            userType: 'Anonymous'
          }
        }
      }
    }
  }

  return { token, isAuthenticated, setToken, logout }
})
