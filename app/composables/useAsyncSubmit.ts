export function useAsyncSubmit() {
  const loading = ref(false)

  async function run(action: () => Promise<void>) {
    loading.value = true
    let success = true
    try {
      await action()
    } catch {
      // erro já tratado pelo interceptor (useFetchData)
      success = false
    } finally {
      loading.value = false
    }
    return success
  }

  return { loading, run }
}
