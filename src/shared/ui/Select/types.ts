export interface ISelectOption {
  name: string
  customText?: boolean
  icon: string
  action?: string
  blockSelect?: boolean
  onClick?: () => void
  disabled?: boolean
  rightText?: string
  active?: boolean
}

export type ITypeSelect = '' | 'light'

export interface ISelect {
  data: ISelectOption[]
  typeStyle?: ITypeSelect
  className?: string
}