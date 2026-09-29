// Cache por src: chamar de novo (ex.: página pré-carrega, depois o step
// espera) reaproveita a mesma promise em vez de baixar/decodificar de novo.
const cache = new Map<string, Promise<void>>()

// Baixa e decodifica a imagem fora do DOM. Nunca rejeita — se falhar, quem
// espera segue em frente (o `width`/`height` do <img> segura o layout).
export function preloadImage(src: string): Promise<void> {
  let promise = cache.get(src)
  if (!promise) {
    const img = new Image()
    img.src = src
    promise = img.decode().catch(() => {
      cache.delete(src)
    })
    cache.set(src, promise)
  }
  return promise
}

export function preloadImages(srcs: readonly string[]): Promise<void> {
  return Promise.all(srcs.map(preloadImage)).then(() => {})
}
