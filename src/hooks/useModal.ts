import { useState } from 'react';
import {IModalTypes} from "../widgets/Modal/types.ts";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<IModalTypes>('burger');

  const openModalHandler = (type: IModalTypes = 'burger') => {
    setIsOpen(true)
    setTypeModal(type)
  };

  const closeModalHandler = () => {
    setIsOpen(false)
    setTypeModal('burger')
  };

  const toggleModalHandler = (type: IModalTypes = 'burger') => {
    setIsOpen(!isOpen)
    setTypeModal(typeModal ? 'burger' : type)
  };

  return {
    typeModal, isOpen, openModalHandler, closeModalHandler, toggleModalHandler
  };
};
