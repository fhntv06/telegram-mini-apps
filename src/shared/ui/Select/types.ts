export interface ISelectOption {
  text: string
  icon: string
  action?: string
  blockSelect?: boolean
  onClick?: () => void
}