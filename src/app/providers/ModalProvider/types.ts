import React from 'react'

export interface ModalContextTypes {
  isOpen:  boolean,
  openModalHandler: ((event: React. MouseEvent<HTMLElement>) => void),
  closeModalHandler: (() => void),
  toggleModalHandler: ((event: React. MouseEvent<HTMLElement>) => void),
}
