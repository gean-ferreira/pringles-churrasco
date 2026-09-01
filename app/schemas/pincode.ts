// Código impresso na embalagem — Step 1 do fluxo de prêmio instantâneo
// (cadastro-nota → abrir-lata). O upload da nota fiscal acontece só no
// resgate (endereço), etapa condicionada a ter ganhado um prêmio.
export const pincodeSchema: Record<string, string> = {
  codigo: 'required|min:7|max:7'
}
