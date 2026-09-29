import { HEADER_HEIGHT } from '~/utils/layout'

const IS_PROMO_CHECK_ACTIVE = false // ligar manualmente perto da data de fim da promoção

export function usePromotionStatus() {
  const isPromotionFinished = useState('isPromotionFinished', () => false)

  const bannerHeight = useState('promoBannerHeight', () => 0)

  const totalHeight = computed(() => HEADER_HEIGHT + bannerHeight.value)

  const fetchStatus = async () => {
    if (!IS_PROMO_CHECK_ACTIVE) return
    try {
      // $fetch direto: fetch silencioso, sem a modal de erro do interceptor.
      // TODO(back): rota não existe na API nova — definir antes de ligar IS_PROMO_CHECK_ACTIVE.
      const response = await $fetch<{ flag: boolean }>(
        `${import.meta.env.VITE_BASE_API}/Participacao/InicioPosCampanha`
      )
      isPromotionFinished.value = response.flag
    } catch {
      isPromotionFinished.value = false // fail open — assume que ainda está ativa
    }
  }

  return { isPromotionFinished, bannerHeight, totalHeight, fetchStatus }
}
