const cache = new Map<string, Promise<void>>()

// Nunca rejeita: se a imagem falhar, quem espera segue em frente.
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
