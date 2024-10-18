import { useState } from 'react';
import { INotificationTypes } from '../widgets/types'

export const useNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<INotificationTypes>('warning');

  const openHandler = (type: INotificationTypes = 'warning') => {
    setIsOpen(true)
    setType(type)
  };

  const closeHandler = () => {
    setIsOpen(false)
    setType('warning')
  };

  const toggleHandler = (type: INotificationTypes = 'warning') => {
    setIsOpen(!isOpen)
    setType(type ? 'warning' : type)
  };

  return {
    type, isOpen, openHandler, closeHandler, toggleHandler
  };
};
