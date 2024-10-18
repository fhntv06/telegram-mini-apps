import React from 'react'
import { useNotification } from '../../../hooks'
import { NotificationContext } from '../../contexts'
import { Notification } from '../../../widgets'

import { WarningNotificationContent, WinsOrLoseContent } from '../../../widgets/Notification/utils'

interface IProps {
  children: React.ReactNode
}

export const NotificationProvider = ({ children }: IProps) => {
  const { type, isOpen, openHandler, closeHandler, toggleHandler } = useNotification();

  return (
    <NotificationContext.Provider value={{ isOpen, openHandler, closeHandler, toggleHandler }}>
      {children}
      <Notification isOpen={isOpen} type={type}>
        {type === 'warning' && <WarningNotificationContent closeHandler={closeHandler} />}
        {(type === 'wins' || type === 'lose') && <WinsOrLoseContent type={type} />}
      </Notification>
    </NotificationContext.Provider>
  )
}