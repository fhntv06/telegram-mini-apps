import { createContext } from 'react'
import { ModalContextTypes } from '../providers/ModalProvider/types'

export const ModalContext = createContext<ModalContextTypes>({
  isOpen: false,
  openHandler: () => {},
  closeHandler: () => {},
  toggleHandler: () => {},
});
