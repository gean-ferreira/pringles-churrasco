export const useAuthStore = defineStore('auth', () => {
  // Cookie (não ref) pra sessão sobreviver a F5 e a links abertos direto.
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
