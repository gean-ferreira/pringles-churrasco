import type { FetchOptions } from '~/types/fetchOptions'
import type { NotificationAction } from '~/stores/modals/notificationModal.store'
import { useAuthStore } from '~/stores/auth.store'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'
import { useLogout } from '~/composables/useLogout'

interface ApiErrorBody {
  title?: string
  titulo?: string
  message?: string
  mensagem?: string
}

function readError(data: unknown) {
  if (!data || typeof data !== 'object') return {}
  const body = data as ApiErrorBody
  return {
    title: body.title ?? body.titulo,
    message: body.message ?? body.mensagem
  }
}

export const useFetchData = async <TResponse, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody>
) => {
  const authStore = useAuthStore()
  const { clearSession } = useLogout()
  const notificationModalStore = useNotificationModalStore()
  const router = useRouter()

  const showErrorModal = (
    title: string,
    description: string,
    action?: NotificationAction
  ) => {
    notificationModalStore.openModal({
      title,
      description,
      actions: [action ?? { label: 'Fechar' }]
    })
  }

  return await $fetch<TResponse>(
    `${import.meta.env.VITE_BASE_API}${endpoint}`,
    {
      method: options.method,
      body: options.body as
        BodyInit | Record<string, unknown> | null | undefined,
      headers: {
        ...(options.requiresAuth &&
          authStore.token && { Authorization: `Bearer ${authStore.token}` })
      },
      onRequestError() {
        showErrorModal(
          'Sem conexão',
          'Não foi possível se conectar ao servidor. Verifique sua internet e tente novamente.'
        )
      },
      onResponseError({ response }) {
        const error = readError(response._data)
        if (response.status === 400) {
          showErrorModal(
            error.title || 'Atenção',
            error.message || 'Erro ao processar a requisição.'
          )
        } else if (response.status === 401) {
          clearSession()
          router.push('/')
          showErrorModal(
            'Login expirado',
            error.message || 'Sua sessão expirou, faça login novamente.'
          )
        } else if (response.status === 404) {
          showErrorModal(
            'Rota inválida',
            'Erro interno do servidor. Por favor, tente novamente mais tarde.',
            {
              label: 'Fechar',
              handler: () => {
                router.push('/')
                notificationModalStore.closeModal()
              }
            }
          )
        } else if (response.status === 423) {
          showErrorModal(
            'Acesso Temporariamente Indisponível',
            'O recurso solicitado está bloqueado no momento. Por favor, tente novamente mais tarde.'
          )
        } else if (response.status === 429) {
          showErrorModal(
            'Atenção',
            typeof response._data === 'string'
              ? response._data
              : 'Muitas tentativas. Tente novamente em instantes.'
          )
        } else if (response.status === 500) {
          showErrorModal(
            'Falha no servidor',
            'Erro interno do servidor. Por favor, tente novamente mais tarde.'
          )
        } else {
          showErrorModal(
            'Erro',
            'Não foi possível concluir a operação. Tente novamente mais tarde.'
          )
        }
      }
    }
  )
}
