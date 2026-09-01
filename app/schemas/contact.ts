export const contactSchema: Record<string, string> = {
  nome: 'required|noLeadingWhitespace|noNumbers|noSpecialCharacters|min:2|max:50',
  email: 'required|email|max:50',
  telefone: 'required|cellphone',
  mensagem: 'required|noLeadingWhitespace|min:10|max:500'
}
