export const registerEditSchema: Record<string, string> = {
  nome: 'required|noLeadingWhitespace|noNumbers|noSpecialCharacters|min:2|max:50',
  sobrenome:
    'required|noLeadingWhitespace|noNumbers|noSpecialCharacters|min:2|max:50',
  telefone: 'required|cellphone',
  email: 'required|email|max:50',
  dt_nascimento: 'required|dateValid|dateNotFuture|minAge:18',
  estado: 'required'
}
