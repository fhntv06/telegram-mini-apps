import { IModalTypes } from '../../../widgets/types'

export interface ModalContextTypes {
  isOpen:  boolean,
  openModalHandler: ((type: IModalTypes) => void),
  closeModalHandler: (() => void),
  toggleModalHandler: ((type: IModalTypes) => void),
}
