export interface NotificationAction {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  handler?: () => void | Promise<void>
}

export interface NotificationOptions {
  title: string
  description: string
  actions?: NotificationAction[]
  dismissible?: boolean
  closeIcon?: boolean
}

export const useNotificationModalStore = defineStore('notificationModal', {
  state: () => ({
    isOpen: false,
    title: '',
    description: '',
    actions: [] as NotificationAction[],
    dismissible: true,
    closeIcon: true
  }),
  actions: {
    openModal(config: NotificationOptions) {
      this.title = config.title
      this.description = config.description
      this.actions = config.actions ?? [{ label: 'Fechar' }]
      this.dismissible = config.dismissible ?? true
      this.closeIcon = config.closeIcon ?? true
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
})
