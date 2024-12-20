import { useState } from 'react';
import { INotificationTypes } from '../widgets/types'

export const useNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<INotificationTypes>('warning')
  const [tons, setTons] = useState<number>(0)
  const [points, setBalls] = useState<number>(0)
  const [settings, setSettings] = useState<{ text: string }>({ text: '' })

  const openHandler = (type: INotificationTypes = 'warning', settings: { text: string } = { text: '' }) => {
    setIsOpen(true)
    setType(type)
    setSettings(settings)
  };

  const closeHandler = () => {
    setIsOpen(false)
  };

  const setTonsHandler = (tons: number = 0) => {
    setTons(tons)
  }
  const setBallsHandler = (points: number = 0) => {
    setBalls(points)
  }
  const setSettingsHandler = (settings: { text: string } = { text: ''}) => {
    setSettings(settings)
  }

  return {
    points, tons, type, settings, isOpen,
    openHandler, closeHandler, setTonsHandler, setSettingsHandler, setBallsHandler
  };
};
