import { useState } from 'react';
import { IModalTypes } from "../widgets/Modal/types.ts";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<IModalTypes>('burger');

  const openHandler = (type: IModalTypes = 'burger') => {
    setIsOpen(true)
    setTypeModal(type)
  };

  const closeHandler = () => {
    setIsOpen(false)
    setTypeModal('burger')
  };

  const toggleHandler = (type: IModalTypes = 'burger') => {
    setIsOpen(!isOpen)
    setTypeModal(typeModal ? 'burger' : type)
  };

  return {
    typeModal, isOpen, openHandler, closeHandler, toggleHandler
  };
};
