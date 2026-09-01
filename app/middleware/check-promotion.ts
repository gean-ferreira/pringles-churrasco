import { usePromotionStatus } from '~/composables/usePromotionStatus'

export default defineNuxtRouteMiddleware(() => {
  const { isPromotionFinished } = usePromotionStatus()
  if (isPromotionFinished.value) return navigateTo('/404')
})
