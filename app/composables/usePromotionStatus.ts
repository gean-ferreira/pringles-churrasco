import { HEADER_HEIGHT } from '~/utils/layout'

const IS_PROMO_CHECK_ACTIVE = false // ligar manualmente perto da data de fim da promoção

export function usePromotionStatus() {
  const isPromotionFinished = useState('isPromotionFinished', () => false)

  // Altura real da faixa, publicada pelo próprio banner (0 quando fora da tela).
  const bannerHeight = useState('promoBannerHeight', () => 0)

  const totalHeight = computed(() => HEADER_HEIGHT + bannerHeight.value)

  const fetchStatus = async () => {
    if (!IS_PROMO_CHECK_ACTIVE) return
    try {
      // Fetch silencioso de boot — bypassa o interceptor de propósito.
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
