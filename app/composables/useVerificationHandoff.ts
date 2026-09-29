import type { AuthCodeResponse, VerificationAction } from '~/types/verification'

// Login e cadastro fazem POST e mandam o usuário para /verificacao com
// resposta e query idênticas — concentra esse shape e o redirect num lugar só.
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
