import { useHeaderStore } from '~/stores/header.store'
import { usePromotionStatus } from '~/composables/usePromotionStatus'

// Toda seção visível na tela fica ativa ao mesmo tempo (não só uma) — o estado
// é um conjunto no header.store, não um único id "ativo".
export function useActiveSection() {
  const header = useHeaderStore()
  const { totalHeight } = usePromotionStatus()
  const margin = computed(() => `-${totalHeight.value + 1}px 0px -1px 0px`)

  const observers = new Map<Element, IntersectionObserver>()
  const observedElements = new Set<Element>()

  function interCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const sectionId = entry.target.id
      if (sectionId) header.setSectionVisibility(entry.isIntersecting, sectionId)
    })
  }

  function startObserving(element: Element | null) {
    if (!element || observedElements.has(element)) return
    const observer = new IntersectionObserver(interCallback, { root: null, threshold: 0, rootMargin: margin.value })
    observers.set(element, observer)
    observedElements.add(element)
    observer.observe(element)
  }

  function reconnectAllObservers() {
    observers.forEach((observer) => observer.disconnect())
    observers.clear()
    observedElements.forEach((element) => {
      const observer = new IntersectionObserver(interCallback, { root: null, threshold: 0, rootMargin: margin.value })
      observers.set(element, observer)
      observer.observe(element)
    })
  }

  function isSectionActive(sectionId: string) {
    return header.isSectionVisible(sectionId)
  }

  onUnmounted(() => {
    observers.forEach((observer) => observer.disconnect())
    observers.clear()
    observedElements.clear()
    header.clearSectionVisibility()
  })

  watch(margin, reconnectAllObservers)

  return { startObserving, isSectionActive, visibleSections: computed(() => header.visibleSections) }
}
