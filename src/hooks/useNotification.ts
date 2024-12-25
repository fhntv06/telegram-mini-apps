import { useState } from 'react';
import { INotificationTypes } from '../widgets/types'

export const useNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<INotificationTypes>('warning')
  const [tons, setTons] = useState<number>(0)
  const [points, setPoints] = useState<number>(10)
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
  const setPointsHandler = (points: number = 0) => {
    setPoints(points)
  }
  const setSettingsHandler = (settings: { text: string } = { text: ''}) => {
    setSettings(settings)
  }

  return {
    points, tons, type, settings, isOpen,
    openHandler, closeHandler, setTonsHandler, setSettingsHandler, setPointsHandler
  };
};
