export type TableVariant = 'default' | 'highlight'

export interface TableColumn {
  key: string
  label: string
  type?: 'text' | 'status'
}
