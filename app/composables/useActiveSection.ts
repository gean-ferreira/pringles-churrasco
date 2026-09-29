import { useHeaderStore } from '~/stores/header.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'

// Todas as seções visíveis ficam ativas ao mesmo tempo, não só uma.
export function useActiveSection(sectionIds: string[]) {
  const header = useHeaderStore()
  const { totalHeight } = usePromotionStatus()
  const nuxtApp = useNuxtApp()

  // Desconta header/banner fixos; o -1px embaixo ignora a seção que só encosta na borda.
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

  // Recria o observer: o rootMargin só é lido na construção e, após trocar de
  // rota, os elementos antigos já saíram do DOM.
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

  // O header vive no layout e não remonta ao trocar de rota.
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
