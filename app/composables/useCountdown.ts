export function useCountdown(defaultSeconds: number) {
  const remaining = ref(defaultSeconds)
  let interval: ReturnType<typeof setInterval> | null = null

  const canResend = computed(() => remaining.value <= 0)
  const label = computed(() => {
    const minutes = Math.floor(remaining.value / 60)
    const seconds = remaining.value % 60
    if (minutes === 0) return `${seconds}S`
    if (seconds === 0) return `${minutes}M`
    return `${minutes}M${seconds}S`
  })

  function start(seconds = defaultSeconds) {
    remaining.value = seconds
    if (interval) clearInterval(interval)
    interval = setInterval(() => {
      if (remaining.value <= 0) {
        if (interval) clearInterval(interval)
        return
      }
      remaining.value--
    }, 1000)
  }

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return { remaining, label, canResend, start }
}
