import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '~/stores/auth.store'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  onNuxtReady(() => {
    window.digitalData = {
      ...window.digitalData,
      page: {
        ...window.digitalData?.page,
        promotionname: 'Pringles Churrasco Promotion',
        propertyID: 'Promotion: Pringles Churrasco Promotion',
        siteCountry: 'Brazil',
        siteLanguage: 'pt-BR',
        siteRegion: 'KLA',
        environment: import.meta.env.VITE_SITE_ENV,
        siteType: 'Promotion site',
        siteEntity: 'Kellanova'
      }
    }

    if (authStore.token) {
      window.digitalData = {
        ...window.digitalData,
        user: {
          ...window.digitalData?.user,
          profile: {
            ...window.digitalData?.user?.profile,
            profileID: jwtDecode<{ ProfileId: string }>(authStore.token)
              .ProfileId
          }
        }
      }
    }
  })
})
