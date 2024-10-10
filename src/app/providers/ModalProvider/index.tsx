import { useModal } from '../../../hooks'
import { ModalContext } from '../../contexts'
import { Modal } from '../../../widgets'
import React from 'react'

import { BurgerModalContent, WalletModalContent, SelectModeModalContent } from '../../../widgets/Modal/utils'

interface IProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: IProps) => {
  const { typeModal, isOpen, openModalHandler, closeModalHandler, toggleModalHandler } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, openModalHandler, closeModalHandler, toggleModalHandler }}>
      {children}
      <Modal isOpen={isOpen} typeModal={typeModal} onClick={closeModalHandler}>
        {typeModal === 'select__mode' && <SelectModeModalContent />}
        {typeModal === 'wallet' && <WalletModalContent />}
        {typeModal === 'burger' && <BurgerModalContent />}
      </Modal>
    </ModalContext.Provider>
  )
}