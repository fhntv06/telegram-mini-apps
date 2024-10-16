import { Select, Icon } from '../../../../shared'
import classNames from 'classnames/bind'
import styles from './WalletModalContent.module.scss'

interface IProps {
  closeModalHandler: () => void
}

const cx = classNames.bind(styles)

const marketData = [
  {
    text: 'P2P Market',
    icon: 'market',
  },
  {
    text: 'Send',
    icon: 'send-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://t.me/CryptoBot',
  },
  {
    text: 'Wallet',
    icon: 'wallet-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://t.me/wallet',
  }
]
const exchangeData = [
  {
    text: 'Centralised exchange',
    icon: 'exchange',
  },
  {
    text: 'mexc',
    icon: 'mexc-market',
    blockSelect: true,
  },
  {
    text: 'binance',
    icon: 'binance-market',
    blockSelect: true,
  },
  {
    text: 'bybit',
    icon: 'bybit-market',
    blockSelect: true,
  }
]

export const WalletModalContent = ({ closeModalHandler }: IProps) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>TOP UP TO CONTINUE</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big' /></span>
        </header>
        <div className={cx('content')}>
          <Select data={marketData} typeStyle='light' />
          <Select data={exchangeData} typeStyle='light' />
        </div>
      </div>
    </div>
  )
}