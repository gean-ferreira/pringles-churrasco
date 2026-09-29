import { useNotificationModalStore } from '~/stores/modals/notificationModal.store'

type OneTrustGroup = 'C0001' | 'C0002' | 'C0003'

function getActiveGroups() {
  if (typeof window === 'undefined') return ''
  return window.OnetrustActiveGroups ?? ''
}

function hasGroup(group: OneTrustGroup) {
  const groups = getActiveGroups()
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  return groups.includes(group)
}

export const useOneTrustConsent = () => {
  const notificationModalStore = useNotificationModalStore()

  const requireConsent = (groups: OneTrustGroup[]) => {
    const hasConsent = groups.some((group) => hasGroup(group))

    if (!hasConsent) {
      notificationModalStore.openModal({
        title: 'Atenção!',
        description:
          'Para continuar, aceite os cookies obrigatórios para liberação.',
        actions: [{ label: 'Fechar' }]
      })
      return false
    }

    return true
  }

  // Fora de produção o OneTrust nem sempre está configurado.
  const requireConsentIfProd = (groups: OneTrustGroup[]) => {
    if (import.meta.env.VITE_SITE_ENV !== 'production') return true
    return requireConsent(groups)
  }

  return { requireConsent, requireConsentIfProd }
}
