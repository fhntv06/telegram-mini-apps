export interface ISelectOption {
  text: string
  customText?: boolean
  icon: string
  action?: string
  blockSelect?: boolean
  onClick?: () => void
  disabled?: boolean
  rightText?: string
}