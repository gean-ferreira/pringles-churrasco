// Mesma ideia do header/promo-banner (mede altura real via ResizeObserver e
// publica como CSS var), só que para uma barra fixa no rodapé. No desktop a
// barra chamadora é `md:hidden` → altura 0 → a var não reserva espaço.
export function useMobileBarOffset(barRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    const updateOffset = () => {
      const height = barRef.value?.offsetHeight ?? 0
      document.documentElement.style.setProperty('--mobile-bar-height', `${height}px`)
    }

    const resizeObserver = new ResizeObserver(updateOffset)
    if (barRef.value) resizeObserver.observe(barRef.value)
    updateOffset()

    onUnmounted(() => {
      resizeObserver.disconnect()
      document.documentElement.style.removeProperty('--mobile-bar-height')
    })
  })
}
