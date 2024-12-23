import { useModal } from '../../../hooks'
import { ModalContext } from '../../contexts'
import { Modal } from '../../../widgets'
import React from 'react'

import { BurgerModalContent, SelectModeModalContent, SwitchModeModalContent } from '../../../widgets/Modal/utils'

interface IProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: IProps) => {
  const { typeModal, isOpen, openHandler, closeHandler, toggleHandler } = useModal()

  return (
    <ModalContext.Provider value={{ isOpen, openHandler, closeHandler, toggleHandler }}>
      {children}
      <Modal isOpen={isOpen} typeModal={typeModal} closeHandler={closeHandler}>
        {typeModal === 'select__mode' && <SelectModeModalContent closeModalHandler={closeHandler} />}
        {typeModal === 'burger' && <BurgerModalContent />}
        {typeModal === 'switchMode' && <SwitchModeModalContent closeModalHandler={closeHandler} />}
      </Modal>
    </ModalContext.Provider>
  )
}
