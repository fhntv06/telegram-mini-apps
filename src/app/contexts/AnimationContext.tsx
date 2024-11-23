import { createContext } from 'react'
import { IAnimationContextTypes } from '../providers/types'

export const AnimationContext = createContext<IAnimationContextTypes>({
  isOpen: false,
  openHandler: () => {},
  closeHandler: () => {},
  toggleHandler: () => {},
});
