// Na navegação client-side o foco ficaria no link clicado (ou no body, se ele
// sumiu). Leva o foco pro <main> da nova página, a não ser que ela mesma já
// tenha focado algo dentro dele (ex.: `autofocus` do AppInput).
export default defineNuxtPlugin((nuxtApp) => {
  let isFirstLoad = true

  nuxtApp.hook('page:finish', () => {
    if (isFirstLoad) {
      isFirstLoad = false
      return
    }
    const main = document.getElementById('conteudo')
    if (!main || main.contains(document.activeElement)) return
    main.focus({ preventScroll: true })
  })
})
