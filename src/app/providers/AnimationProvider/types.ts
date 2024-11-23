import { IAnimationTypes } from '../../../widgets/types'

export interface IAnimationContextTypes {
  isOpen:  boolean,
  openHandler: ((type: IAnimationTypes) => void),
  closeHandler: (() => void),
  toggleHandler: ((type: IAnimationTypes) => void),
}