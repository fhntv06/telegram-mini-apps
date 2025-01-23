import React, { useEffect } from 'react'
import { useNotification } from '../../../hooks'
import { NotificationContext } from '../../contexts'
import { Notification } from '../../../widgets'

import { WarningNotificationContent, WinsOrLoseContent } from '../../../widgets/Notification/utils'

interface IProps {
  children: React.ReactNode
}

export const NotificationProvider = ({ children }: IProps) => {
  const { points, tons, type, settings, isOpen, openHandler, closeHandler, setTonsHandler, setPointsHandler } = useNotification()

  useEffect(() => {
    const timer = setTimeout(closeHandler, 5000)

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <NotificationContext.Provider value={{ isOpen, openHandler, closeHandler, setTonsHandler, setPointsHandler }}>
      {children}
      <Notification isOpen={isOpen} type={type}>
        {type === 'warning' && <WarningNotificationContent text={settings.text} closeHandler={closeHandler} />}
        {(type === 'wins' || type === 'lose' || type === 'refund') && <WinsOrLoseContent type={type} data={{ tons, points }} />}
      </Notification>
    </NotificationContext.Provider>
  )
}
