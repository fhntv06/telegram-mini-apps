import { IAnimationTypes } from '../../../widgets/types'

export interface AnimationContextTypes {
  isOpen:  boolean,
  openHandler: ((type: IAnimationTypes) => void),
  closeHandler: (() => void),
  toggleHandler: ((type: IAnimationTypes) => void),
}