export const useFormError = () => {
  function onInvalidSubmit() {
    nextTick(() => {
      const alertElement = document.querySelector('[role="alert"]')
      if (!alertElement) return
      const offset = alertElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: offset - window.innerHeight / 2, behavior: 'smooth' })
      const errorField = alertElement
        .closest('[data-field]')
        ?.querySelector<HTMLElement>('input, textarea, select')
      if (errorField) setTimeout(() => errorField.focus(), 300)
    })
  }
  return { onInvalidSubmit }
}
