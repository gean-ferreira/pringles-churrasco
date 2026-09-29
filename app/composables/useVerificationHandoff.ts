import type { AuthCodeResponse, VerificationAction } from '~/types/verification'

export function useVerificationHandoff() {
  async function goToVerification(
    res: AuthCodeResponse,
    action: VerificationAction
  ) {
    await navigateTo({
      path: '/verificacao',
      query: {
        email: res.mask,
        token: res.token,
        action
      }
    })
  }

  return { goToVerification }
}
