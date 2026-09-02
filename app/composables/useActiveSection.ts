import { useHeaderStore } from '~/stores/header.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'

// Toda seção visível na tela fica ativa ao mesmo tempo (não só uma) — o estado
// é um conjunto no header.store, não um único id "ativo".
export function useActiveSection(sectionIds: string[]) {
  const header = useHeaderStore()
  const { totalHeight } = usePromotionStatus()
  const nuxtApp = useNuxtApp()

  // Desconta o que está fixo no topo: uma seção sob o header não conta como
  // visível. O -1px embaixo evita que a seção seguinte, ainda encostando na
  // borda, entre junto.
  const margin = computed(() => `-${totalHeight.value + 1}px 0px -1px 0px`)

  let observer: IntersectionObserver | null = null

  function onIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const sectionId = entry.target.id
      if (sectionId)
        header.setSectionVisibility(entry.isIntersecting, sectionId)
    })
  }

  function disconnect() {
    observer?.disconnect()
    observer = null
    header.clearSectionVisibility()
  }

  // Recria tudo do zero a cada chamada: o rootMargin só é lido na construção
  // do observer, e (ao voltar de outra rota) os elementos antigos já foram
  // destruídos — reaproveitá-los observaria nós fora do DOM.
  function scan() {
    disconnect()

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (!elements.length) return

    observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0,
      rootMargin: margin.value
    })
    elements.forEach((element) => observer?.observe(element))
  }

  function isSectionActive(sectionId: string) {
    return header.isSectionVisible(sectionId)
  }

  onMounted(scan)
  watch(margin, scan)

  // O header vive no layout e não remonta a cada rota: só o mount não basta,
  // pois chegar na home vindo de outra página criaria as seções sem observer
  // nenhum ligado. `page:finish` roda depois do render da nova página.
  const unhook = nuxtApp.hook('page:finish', scan)

  onUnmounted(() => {
    unhook()
    disconnect()
  })

  return {
    isSectionActive,
    visibleSections: computed(() => header.visibleSections)
  }
}
