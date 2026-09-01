export const useHeaderStore = defineStore('header', {
  state: () => ({
    isOpen: false,
    visibleSections: [] as string[]
  }),
  getters: {
    isSectionVisible: (state) => (sectionId: string) => state.visibleSections.includes(sectionId)
  },
  actions: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      this.updateBodyScroll()
    },
    closeMenu() {
      this.isOpen = false
      this.updateBodyScroll()
    },
    updateBodyScroll() {
      document.body.style.overflow = this.isOpen ? 'hidden' : ''
    },
    setSectionVisibility(visible: boolean, sectionId: string) {
      if (visible) this.addVisibleSection(sectionId)
      else this.removeVisibleSection(sectionId)
    },
    addVisibleSection(sectionId: string) {
      if (!this.visibleSections.includes(sectionId)) this.visibleSections.push(sectionId)
    },
    removeVisibleSection(sectionId: string) {
      const index = this.visibleSections.indexOf(sectionId)
      if (index !== -1) this.visibleSections.splice(index, 1)
    },
    clearSectionVisibility() {
      this.visibleSections = []
    }
  }
})
