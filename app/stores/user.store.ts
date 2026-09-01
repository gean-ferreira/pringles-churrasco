import type { User } from '~/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(data: User) {
      this.user = data
    },
    clearUser() {
      this.user = null
    }
  }
})
