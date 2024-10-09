import React, { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [elementTarget, setElementTarget] = useState<HTMLElement | null>(null);

  const openModalHandler = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(true)

    console.log(event)

    setElementTarget(event.currentTarget)
  };

  const closeModalHandler = () => {
    setIsOpen(false)
    setElementTarget(null)
  };

  const toggleModalHandler = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(!isOpen)
    setElementTarget(elementTarget ? null : event.currentTarget)
  };

  return {
    elementTarget, isOpen, openModalHandler, closeModalHandler, toggleModalHandler
  };
};
