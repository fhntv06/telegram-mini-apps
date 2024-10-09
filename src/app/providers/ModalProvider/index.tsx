import { useModal } from '../../../hooks'
import { ModalContext } from '../../contexts'
import { Modal } from '../../../widgets';
import React from 'react'

interface IProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: IProps) => {
  const { elementTarget, isOpen, openModalHandler, closeModalHandler, toggleModalHandler } = useModal();

  console.log('isOpen ', isOpen)

  return (
    <ModalContext.Provider value={{ isOpen, openModalHandler, closeModalHandler, toggleModalHandler }}>
      {children}
      <Modal isOpen={isOpen} typeModal={elementTarget && elementTarget.dataset.typeModal} onClick={toggleModalHandler}>
        <p>Modal</p>
      </Modal>
    </ModalContext.Provider>
  )
}