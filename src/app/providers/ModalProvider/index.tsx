import { useModal } from '../../../hooks'
import { ModalContext } from '../../contexts'
import { Modal } from '../../../widgets'
import React from 'react'

import { BurgerModalContent, WalletModalContent, SelectModeModalContent } from '../../../widgets/Modal/utils'

interface IProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: IProps) => {
  const { typeModal, isOpen, openHandler, closeHandler, toggleHandler } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, openHandler, closeHandler, toggleHandler }}>
      {children}
      <Modal isOpen={isOpen} typeModal={typeModal} onClick={closeHandler}>
        {typeModal === 'select__mode' && <SelectModeModalContent closeModalHandler={closeHandler} />}
        {typeModal === 'wallet' && <WalletModalContent closeModalHandler={closeHandler} />}
        {typeModal === 'burger' && <BurgerModalContent />}
      </Modal>
    </ModalContext.Provider>
  )
}