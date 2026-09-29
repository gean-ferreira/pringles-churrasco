export function useMobileBarOffset(barRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    const updateOffset = () => {
      const height = barRef.value?.offsetHeight ?? 0
      document.documentElement.style.setProperty(
        '--mobile-bar-height',
        `${height}px`
      )
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
