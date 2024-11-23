import { INotificationTypes } from '../../../widgets/types'

export interface NotificationContextTypes {
  isOpen:  boolean,
  openHandler: ((type: INotificationTypes, settings?: { text: string }) => void),
  closeHandler: (() => void),
  setTonsHandler: ((tons: number) => void),
}
