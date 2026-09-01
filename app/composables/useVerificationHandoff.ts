import type { VerificationAction } from '~/types/verification'

interface AuthResponse {
  mensagem: string
  token: string
  confirmacaoCadastro?: boolean
  contador?: number
}

// Login e cadastro fazem POST e mandam o usuário para /verificacao com
// resposta e query idênticas — concentra esse shape e o redirect num lugar só.
export function useVerificationHandoff() {
  async function goToVerification(res: AuthResponse, action: VerificationAction) {
    await navigateTo({
      path: '/verificacao',
      query: {
        email: res.mensagem,
        contador: res.contador,
        token: res.token,
        action
      }
    })
  }

  return { goToVerification }
}
