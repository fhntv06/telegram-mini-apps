import classNames from 'classnames/bind'
import { useGetPhrases, useOpenInvoice } from '../../../../hooks'
import {Button, Icon, minBet} from '../../../../shared'

import styles from './TopUpStarsModalContent.module.scss'
import {useEffect, useRef, useState} from "react";

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

const defaultWidthInput = 32

export const TopUpStarsModalContent = ({ closeModalHandler }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [stars, setStars] = useState<number>(minBet)
  const [widthInput, setWidthInput] = useState(defaultWidthInput * 2)
  const { openInvoice } = useOpenInvoice()

  const { topUp, enterTheDepositAmount } = useGetPhrases(['topUp', 'enterTheDepositAmount'])

  const topUpStarsModeHandler = () => {
    openInvoice(stars)
    // closeModalHandler()
  }
  const validateStarsInputHandler = (value: string) => {
    setStars(Number(/^\d+$/.test(value) ? parseInt(value, 10) : 0))
  }
  const calculateWidthInputHandler = () => {
    setWidthInput(defaultWidthInput * stars.toString().length)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className={cx('modal')}>
      <div className={cx('modal__wrapper')}>
        <span className={cx('modal__close')} onClick={closeModalHandler}><Icon name='cross' size='big'/></span>
        <h1 className={cx('title')}>{enterTheDepositAmount}</h1>
        <div className={cx('modal__input-container')}>
          <input
            ref={inputRef}
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
          onClick={topUpStarsModeHandler}
          type='blue'
          iconLeftName='plus'
          sizeIcons='big'
          disabled={!stars}
        >
          {topUp}
        </Button>
      </div>
    </div>
  )
}
