import type { Form } from 'vee-validate'
import { useAuthStore } from '~/stores/auth.store'
import { useUserStore } from '~/stores/user.store'
import type { ApiUser, User } from '~/types/user'
import { useFetchData } from '~/composables/useFetchData'

type InitialValuesMapper = (user: User) => Record<string, unknown>

function toUser(api: ApiUser): User {
  return {
    id: api.id,
    cpf: api.cpf,
    nome: api.name,
    sobrenome: api.lastName,
    telefone: api.phoneNumber,
    email: api.email,
    dt_nascimento: api.birthDate,
    estado: api.uf,
    aceite_Regulamento: api.termsAndConditions,
    aceite_Politica: api.privacyPolicy,
    aceite_Novidades: api.acceptsMarketingEmails
  }
}

export function useUserPrefill() {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const prefilling = ref(false)

  async function loadUser(): Promise<User | null> {
    if (userStore.user) return userStore.user
    if (!authStore.isAuthenticated) return null

    const res = await useFetchData<{ content: ApiUser }>('/User/Get', {
      method: 'GET',
      requiresAuth: true
    })
    const user = toUser(res.content)
    userStore.setUser(user)
    return user
  }

  async function prefill(
    formRef: Ref<typeof Form | null>,
    mapInitialValues: InitialValuesMapper
  ) {
    prefilling.value = !userStore.user
    try {
      const user = await loadUser()
      if (user) formRef.value?.resetForm({ values: mapInitialValues(user) })
    } catch {
      // erro já tratado pelo interceptor
    } finally {
      prefilling.value = false
    }
  }

  return { prefilling, prefill, loadUser }
}
