import { createContext } from 'react'
import { INotificationContextTypes } from '../providers/NotificationProvider/types'

export const NotificationContext = createContext<INotificationContextTypes>({
  isOpen: false,
  openHandler: () => {},
  closeHandler: () => {},
  setTonsHandler: () => {},
  setBallsHandler: () => {},
});
