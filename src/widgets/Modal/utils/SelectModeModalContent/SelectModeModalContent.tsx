import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import { IModeSettings } from '../../../../app/store/slices/mode/types'
import { IconNames } from '../../../../shared/types'
import { setModeSettings, initialState } from '../../../../app/store/slices/mode'
import { useGetPhrases } from '../../../../hooks'
import { Button, Icon, Select } from '../../../../shared'

import styles from './SelectModeModalContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

const modeData = [
  {
    text: '110sec',
    icon: 'timer',
  },
  {
    text: '5minutes',
    icon: 'timer',
  },
  {
    text: '30minutes',
    icon: 'timer',
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

  // @ts-ignore
  const { selectMode, assets, confirm } = useGetPhrases(['selectMode', 'assets', 'confirm'])

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
          <p>{selectMode}</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big' /></span>
        </header>
        <Select data={modeData} typeStyle='light' />
      </div>
      <div className={cx('container')}>
        <header>
          <p>{assets}</p>
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

      <Button className={cx('button__confirm')} onClick={confirmHandler} disabled>{confirm}</Button>
    </div>
  )
}