import { Button, Icon, Select } from '../../../../shared'
import classNames from 'classnames/bind'
import { IconNames } from '../../../../shared/types'
import { useDispatch } from 'react-redux'
import { setModeSettings, initialState } from '../../../../app/store/slices/mode'

import styles from './SelectModeModalContent.module.scss'
import { useState } from 'react'
import { IModeSettings } from '../../../../app/store/slices/mode/types'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

const modeData = [
  {
    text: '30 seconds',
    icon: 'timer',
    onClick: () => alert('30 seconds'),
  },
  {
    text: '5 seconds',
    icon: 'timer',
    onClick: () => alert('5 seconds'),
  },
  {
    text: '1 minutes',
    icon: 'timer',
    onClick: () => alert('1 minutes'),
  },
]

const coins: IconNames[] = [
  'bitcoin',
  'bitcoin',
  'notcoin',
  'ton',
  'tether', 
  'ton',
  'tether',
  'notcoin',
  'bitcoin',
  'bitcoin'
]

export const SelectModeModalContent = ({ closeModalHandler }: IProps) => {
  // @ts-ignore
  const [modeSettins, setStateModeSettings] = useState<IModeSettings>(initialState)
  const dispatch = useDispatch()

  const confirmHandler = () => {
    dispatch(
      setModeSettings({
        coin: 'btc',
        time: {
            text: '$BTC, 30s',
            value: 30,
            unit: 's'
        },
      })
    )
    closeModalHandler()
  }
  return (  
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>SELECT MODE</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big' /></span>
        </header>
        <Select data={modeData} typeStyle='light' />
      </div>
      <div className={cx('container')}>
        <header>
          <p>COINS</p>
        </header>
        <div className={cx('coins')}>
          {coins.map((coin: IconNames) => (
            <Button
              className={cx('coin')}
              iconLeftName={coin}
              sizeLeftIcon='big'
              type='light'
              // onClick={() => setStateModeSettings(coin)}
            />
          ))}
        </div>
      </div>

      <Button className={cx('button__confirm')} onClick={confirmHandler}>Confirm</Button>
    </div>
  )
}