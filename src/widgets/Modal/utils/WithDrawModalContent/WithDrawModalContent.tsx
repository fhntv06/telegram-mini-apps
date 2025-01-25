import WebApp from '@twa-dev/sdk'
import classNames from 'classnames/bind'
import { useGetPhrases } from '../../../../hooks'
import { Button, Icon } from '../../../../shared'

import { useContext, useState } from 'react'
import { withdrawRequest } from '../../../../app/api/stars'
import { INotificationContextTypes } from '../../../../app/providers/NotificationProvider/types'
import { NotificationContext } from '../../../../app/contexts'

import styles from './WithDrawModalContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

const defaultWidthInput = 32

export const WithDrawModalContent = ({ closeModalHandler }: IProps) => {
  const [stars, setStars] = useState<number>(0)
  const [widthInput, setWidthInput] = useState(defaultWidthInput)
  const { withDraw, theMinimumNumberOfStars } = useGetPhrases(['withDraw', 'theMinimumNumberOfStars'])
  const { openHandler: openHandlerNotification, setTonsHandler, setPointsHandler } = useContext<INotificationContextTypes>(NotificationContext)

  const withDrawHandler = () => {
    const data = {
      amount: stars,
      initData: WebApp.initData
    }

    withdrawRequest(data)
      .then((res) => {
        console.log(res.data.message)
        openHandlerNotification('wins')
        setTonsHandler(stars)
        setPointsHandler(0) // не показываем счетчик поинтов
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openHandlerNotification('warning', { text: theMinimumNumberOfStars })
        }
        throw new Error('Error in withdrawRequest: ' + error.response.data.error)
      })
    // closeModalHandler()
  }
  const validateStarsInputHandler = (value: string) => {
    setStars(Number(/^\d+$/.test(value) ? parseInt(value, 10) : 0))
  }
  const calculateWidthInputHandler = () => {
    setWidthInput(defaultWidthInput * stars.toString().length)
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('modal__wrapper')}>
        <span className={cx('modal__close')} onClick={closeModalHandler}><Icon name='cross' size='big'/></span>
        <h1 className={cx('title')}>{withDraw}</h1>
        <div className={cx('modal__input-container')}>
          <input
            className={cx('input-stars')}
            style={{ width: widthInput }}
            value={stars}
            onChange={(event) => {
              validateStarsInputHandler(event.currentTarget.value)
              calculateWidthInputHandler()
            }}
          />
          <Icon name='stars-1' size='big'/>
        </div>
        <Button
          className={cx('button', 'button__confirm', 'p font-w-semibold')}
          onClick={withDrawHandler}
          type='blue'
          iconLeftName='plus'
          sizeIcons='big'
          disabled={!stars}
        >
          {withDraw} (minimum 500)
        </Button>
      </div>
    </div>
  )
}
