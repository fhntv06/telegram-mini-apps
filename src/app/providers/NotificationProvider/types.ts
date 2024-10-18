import { INotificationTypes } from '../../../widgets/types'

export interface NotificationContextTypes {
  isOpen:  boolean,
  openHandler: ((type: INotificationTypes) => void),
  closeHandler: (() => void),
  toggleHandler: ((type: INotificationTypes) => void),
}
