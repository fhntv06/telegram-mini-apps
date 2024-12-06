import { useState } from 'react'
import classNames from 'classnames/bind'
// import { IModeSettings } from '../../../../app/store/slices/mode/types'
import { IconNames, typeDemoMode, typeOnChainMode } from '../../../../shared/types'
import { useChangeGameMode, useGetPhrases } from '../../../../hooks'
import {
  Button, Icon, Select, SelectHorizontal,
  isDemoMode, isOnChainMode
} from '../../../../shared'

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
  }
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
  // const [modeSettins, setStateModeSettings] = useState<IModeSettings>(initialState)
  const [mode, setMode] = useState<typeDemoMode | typeOnChainMode>(isDemoMode)
  const changeGameMode = useChangeGameMode()

  const { selectMode, assets, gameMode,
    realMode, demoMode, confirm
  } = useGetPhrases(['selectMode', 'assets', 'gameMode', 'realMode', 'demoMode', 'confirm'])

  const confirmHandler = () => {
    changeGameMode(mode)
    closeModalHandler()
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>{selectMode}</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big'/></span>
        </header>
        <Select data={modeData} typeStyle='light'/>
      </div>
      <div className={cx('container')}>
        <header>
          <p>{assets}</p>
        </header>
        <div className={cx('coins')}>
          {coins.map((coin: ICoins) => (
            <Button
              key={coin.icon}
              className={cx('coin', {active: coin.choose, 'mask--disabled': coin.disabled})}
              type='light'
              disabled={coin.disabled}
              // onClick={() => setStateModeSettings(coin)}
            >
              <Icon name={coin.icon} size='big'/>
              {coin.disabled && <p className={cx('p-x-small')}>COMING SOON</p>}
            </Button>
          ))}
        </div>
      </div>
      <div className={cx('container')}>
        <header>
          <p>{gameMode}</p>
        </header>
        <div className={cx('coins')}>
          <SelectHorizontal
            changeId={isDemoMode}
            textBtnLeft={realMode}
            textBtnRight={demoMode}
            onClickLeftBtn={() => setMode(isOnChainMode)}
            onClickRightBtn={() => setMode(isDemoMode)}
          />
        </div>
      </div>

      <Button
        className={cx('button', 'p font-w-semibold')}
        onClick={confirmHandler}
        type='blue'
      >
        {confirm}
      </Button>
    </div>
  )
}
