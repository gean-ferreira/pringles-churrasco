import { usePromotionStatus } from '~/composables/usePromotionStatus'
import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

export default defineNuxtPlugin(() => {
  const { fetchStatus, isPromotionFinished } = usePromotionStatus()
  const notificationModalStore = useNotificationModalStore()

  callOnce(async () => {
    await fetchStatus()
    if (isPromotionFinished.value) {
      notificationModalStore.openModal({
        title: 'Promoção encerrada',
        description: 'O período de participação foi encerrado.',
        actions: [{ label: 'Fechar' }]
      })
    }
  })
})
