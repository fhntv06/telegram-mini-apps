import { useState } from 'react';
import { INotificationTypes } from '../widgets/types'

export const useNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<INotificationTypes>('warning')
  const [tons, setTons] = useState<number>(0)

  const openHandler = (type: INotificationTypes = 'warning') => {
    setIsOpen(true)
    setType(type)
  };

  const closeHandler = () => {
    setIsOpen(false)
  };

  const setTonsHandler = (tons: number = 0) => {
    setTons(tons)
  }

  return {
    tons, type, isOpen, openHandler, closeHandler, setTonsHandler
  };
};
