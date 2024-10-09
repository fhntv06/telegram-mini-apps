import { useModal } from '../../../hooks'
import { ModalContext } from '../../contexts'
import { Modal } from '../../../widgets';
import React from 'react'

interface IProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: IProps) => {
  const { typeModal, isOpen, openModalHandler, closeModalHandler, toggleModalHandler } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, openModalHandler, closeModalHandler, toggleModalHandler }}>
      {children}
      <Modal isOpen={isOpen} typeModal={typeModal} onClick={closeModalHandler}>
        <p>Modal</p>
      </Modal>
    </ModalContext.Provider>
  )
}