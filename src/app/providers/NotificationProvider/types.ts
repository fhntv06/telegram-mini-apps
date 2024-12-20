import { INotificationTypes } from '../../../widgets/types'

export interface INotificationContextTypes {
  isOpen:  boolean,
  openHandler: ((type: INotificationTypes, settings?: { text: string }) => void),
  closeHandler: (() => void),
  setTonsHandler: ((tons: number) => void),
  setBallsHandler: ((points: number) => void),
}
