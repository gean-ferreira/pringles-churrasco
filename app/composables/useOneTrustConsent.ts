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

// Substitui o middleware/CookieModal nativo da skill (ver SKILL.md 3.1): a
// campanha usa OneTrust como ferramenta de consentimento, então o "gate" checa
// os grupos ativos do OneTrust em vez de um useCookie('accepted') próprio.
export const useOneTrustConsent = () => {
  const notificationModalStore = useNotificationModalStore()

  const requireConsent = (groups: OneTrustGroup[]) => {
    const hasConsent = groups.some((group) => hasGroup(group))

    if (!hasConsent) {
      notificationModalStore.openModal({
        title: 'Atenção!',
        description: 'Para continuar, aceite os cookies obrigatórios para liberação.',
        actions: [{ label: 'Fechar' }]
      })
      return false
    }

    return true
  }

  return { requireConsent }
}
