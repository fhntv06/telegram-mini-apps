import React, { useEffect } from 'react'
import { useNotification } from '../../../hooks'
import { NotificationContext } from '../../contexts'
import { Notification } from '../../../widgets'

import { WarningNotificationContent, WinsOrLoseContent } from '../../../widgets/Notification/utils'

interface IProps {
  children: React.ReactNode
}

export const NotificationProvider = ({ children }: IProps) => {
  const { tons, type, settings, isOpen, openHandler, closeHandler, setTonsHandler } = useNotification()

  useEffect(() => {
    const timer = setTimeout(closeHandler, 5000)

    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <NotificationContext.Provider value={{ isOpen, openHandler, closeHandler, setTonsHandler }}>
      {children}
      <Notification isOpen={isOpen} type={type}>
        {type === 'warning' && <WarningNotificationContent text={settings.text} closeHandler={closeHandler} />}
        {(type === 'wins' || type === 'lose' || type === 'refund') && <WinsOrLoseContent type={type} tons={tons} />}
      </Notification>
    </NotificationContext.Provider>
  )
}