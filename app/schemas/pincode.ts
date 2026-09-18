// Código impresso na embalagem — step 2 do wizard de prêmio instantâneo em
// cadastro-nota.vue. O upload da nota fiscal acontece só no resgate
// (endereço), etapa condicionada a ter ganhado um prêmio.
export const pincodeSchema: Record<string, string> = {
  codigo: 'required|min:7|max:7'
}
