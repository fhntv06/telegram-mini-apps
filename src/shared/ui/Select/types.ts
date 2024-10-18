export interface ISelectOption {
  text: string
  icon: string
  action?: string
  blockSelect?: boolean
  onClick?: () => void
  disabled?: boolean
  rightText?: string
}