export interface ISelectOption {
  name: string
  customText?: boolean
  icon: string
  action?: string
  blockSelect?: boolean
  onClick?: () => void
  disabled?: boolean
  rightText?: string
  active: boolean
}