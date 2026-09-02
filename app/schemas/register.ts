export const registerSchema: Record<string, string> = {
  cpf: 'required|validCPF',
  nome: 'required|noLeadingWhitespace|noNumbers|noSpecialCharacters|min:2|max:50',
  sobrenome:
    'required|noLeadingWhitespace|noNumbers|noSpecialCharacters|min:2|max:50',
  telefone: 'required|cellphone',
  email: 'required|email|max:50',
  confirmEmail: 'required|email|max:50|confirmed:@email',
  dt_nascimento: 'required|dateValid|dateNotFuture|minAge:18',
  estado: 'required',
  aceite_Regulamento: 'checkbox',
  aceite_Politica: 'checkbox'
}
