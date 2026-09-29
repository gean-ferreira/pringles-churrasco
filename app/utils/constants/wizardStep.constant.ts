export const WIZARD_STEP = {
  VOTACAO: 1,
  CODIGO: 2,
  RESULTADO: 3,
  NOTA_FISCAL: 4
} as const

export type WizardStep = (typeof WIZARD_STEP)[keyof typeof WIZARD_STEP]
