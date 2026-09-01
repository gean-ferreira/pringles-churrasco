export {}

declare global {
  interface Window {
    _satellite?: {
      track: (event: string) => void
    }
    OnetrustActiveGroups?: string
    OneTrust: {
      ToggleInfoDisplay: () => void
    }
    digitalData?: {
      page?: {
        promotionname?: string
        propertyID?: string
        siteCountry?: string
        siteLanguage?: string
        siteRegion?: string
        environment?: string
        siteType?: string
        siteEntity?: string
      }
      user?: {
        attributes?: {
          isLoggedIn?: boolean
        }
        profile?: {
          profileID?: string
          userType?: string
        }
      }
      product?: {
        productInfo: {
          productId: string
          productName: string
          productCategory: string
          productSubCategory: string
        }
      }[]
    }
  }
}
