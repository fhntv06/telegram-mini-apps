import { createContext } from 'react'
import { AnimationContextTypes } from '../providers/types'

export const AnimationContext = createContext<AnimationContextTypes>({
  isOpen: false,
  openHandler: () => {},
  closeHandler: () => {},
  toggleHandler: () => {},
});
