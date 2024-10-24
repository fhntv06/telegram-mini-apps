// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
// import { IModeSettings } from '../../../../app/store/slices/mode/types'
import { IconNames } from '../../../../shared/types'
import {
  setModeSettings,
  // initialState
} from '../../../../app/store/slices/mode'
import { useGetPhrases } from '../../../../hooks'
import { Button, Icon, Select } from '../../../../shared'
import styles from './SelectModeModalContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

const modeData = [
  {
    name: '30 Seconds',
    rightText: 'commingSoon',
    icon: 'timer',
  },
  {
    name: '5 Minutes',
    rightText: 'commingSoon',
    icon: 'timer',
    disabled: true,
    blockSelect: true,
  },
  {
    name: '30 Minutes',
    rightText: 'commingSoon',
    icon: 'timer',
    disabled: true,
    blockSelect: true,
  },
  {
    name: '301 Minutes',
    customText: true,
    rightText: 'commingSoon',
    icon: 'timer',
    disabled: true,
    blockSelect: true,
  },
  {
    name: '01 Minutes',
    customText: true,
    rightText: 'commingSoon',
    icon: 'timer',
    disabled: true,
    blockSelect: true,
  },
  {
    name: '011 Minutes',
    customText: true,
    rightText: 'commingSoon',
    icon: 'timer',
    disabled: true,
    blockSelect: true,
  },
]

interface ICoins {
  icon: IconNames,
  choose: boolean,
  disabled: boolean,
}

const coins: ICoins[] = [
  {
    icon: 'bitcoin',
    choose: true,
    disabled: false,
  },
  {
    icon: 'ton',
    choose: false,
    disabled: true,
  },
  {
    icon: 'etherium-coin',
    choose: false,
    disabled: true,
  },
  {
    icon: 'solana-coin',
    choose: false,
    disabled: true,
  },
  {
    icon: 'oil-coin',
    choose: false,
    disabled: true,
  },
  {
    icon: 'gold-coin',
    choose: false,
    disabled: true,
  },
  {
    icon: 'nasdaq-coin',
    choose: false,
    disabled: true,
  },
  {
    icon: 'sp500-coin',
    choose: false,
    disabled: true,
  },
]

export const SelectModeModalContent = ({ closeModalHandler }: IProps) => {
  // @ts-ignore
  // const [modeSettins, setStateModeSettings] = useState<IModeSettings>(initialState)
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
          {coins.map((coin: ICoins) => (
            <Button
              key={coin.icon}
              className={cx('coin', { active: coin.choose, 'mask--disabled': coin.disabled })}
              type='light'
              disabled={coin.disabled}
              // onClick={() => setStateModeSettings(coin)}
            >
              <Icon name={coin.icon} size='big' />
              {coin.disabled && <p className={cx('p-x-small')}>COMING SOON</p>}
            </Button>
          ))}
        </div>
      </div>

      <Button className={cx('button__confirm')} onClick={confirmHandler} disabled>{confirm}</Button>
    </div>
  )
}