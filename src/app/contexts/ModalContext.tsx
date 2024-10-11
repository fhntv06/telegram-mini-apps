import { createContext } from 'react'
import { ModalContextTypes } from '../providers/ModalProvider/types.ts'

export const ModalContext = createContext<ModalContextTypes>({
  isOpen: false,
  openModalHandler: () => {},
  closeModalHandler: () => {},
  toggleModalHandler: () => {},
});