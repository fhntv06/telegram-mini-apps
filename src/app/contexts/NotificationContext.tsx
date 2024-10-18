import { createContext } from 'react'
import { NotificationContextTypes } from '../providers/NotificationProvider/types'

export const NotificationContext = createContext<NotificationContextTypes>({
  isOpen: false,
  openHandler: () => {},
  closeHandler: () => {},
  toggleHandler: () => {},
});
