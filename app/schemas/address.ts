export const addressSchema: Record<string, string> = {
  cep: 'required|cep',
  rua: 'required|min:2|max:50',
  numero: 'required|min:1|max:10',
  complemento: 'min:1|max:50',
  bairro: 'required|min:2|max:50',
  cidade: 'required|min:2|max:50',
  estado: 'required',
  celular: 'required|cellphone',
  anexo: 'required|fileType:jpg,jpeg,png,pdf|fileSize:10485760'
}
