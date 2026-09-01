export function toFormData(payload: Record<string, unknown>): FormData {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
      return
    }
    formData.append(key, String(value))
  })

  return formData
}
