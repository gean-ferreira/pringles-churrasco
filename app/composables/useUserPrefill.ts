import type { Form } from 'vee-validate'
import { useAuthStore } from '~/stores/auth.store'
import { useUserStore } from '~/stores/user.store'
import type { User } from '~/types/user'
import { useFetchData } from '~/composables/useFetchData'
import { formatDate } from '~/utils/functions/date.function'

type InitialValuesMapper = (user: User) => Record<string, unknown>

// Cache-first: se userStore.user já está populado nesta sessão, resetForm
// direto dele; só busca (/Usuario/Consultar) quando não está.
export function useUserPrefill() {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const prefilling = ref(false)

  function normalizeUser(user: User): User {
    return { ...user, dt_nascimento: formatDate(user.dt_nascimento) }
  }

  async function prefill(formRef: Ref<typeof Form | null>, mapInitialValues: InitialValuesMapper) {
    if (userStore.user) {
      formRef.value?.resetForm({ values: mapInitialValues(normalizeUser(userStore.user)) })
      return
    }

    if (!authStore.isAuthenticated) return

    prefilling.value = true
    try {
      const res = await useFetchData<{ data: User }>('/Usuario/Consultar', {
        method: 'GET',
        requiresAuth: true
      })
      userStore.setUser(res.data)
      formRef.value?.resetForm({ values: mapInitialValues(normalizeUser(res.data)) })
    } catch {
      // erro já tratado pelo interceptor
    } finally {
      prefilling.value = false
    }
  }

  return { prefilling, prefill }
}
