import { Select, Icon } from '../../../../shared'
import classNames from 'classnames/bind'

import { useGetPhrases } from '../../../../hooks'

import styles from './WalletModalContent.module.scss'

interface IProps {
  closeModalHandler: () => void
}

const cx = classNames.bind(styles)

const marketData = [
  {
    text: 'P2PMarket',
    icon: 'market',
  },
  {
    text: 'send',
    icon: 'send-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://t.me/CryptoBot',
  },
  {
    text: 'wallet',
    icon: 'wallet-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://t.me/wallet',
  }
]
const exchangeData = [
  {
    text: 'centralisedExchange',
    icon: 'exchange',
  },
  {
    text: 'mexc',
    icon: 'mexc-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://otc.mexc.com/ru-RU/fastTransaction',
  },
  {
    text: 'binance',
    icon: 'binance-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://www.binance.com/en-GB/crypto/buy/USD/TON',
  },
  {
    text: 'bybit',
    icon: 'bybit-market',
    blockSelect: true,
    onClick: () => window.location.href = 'https://www.bybit.com/fiat/trade/express/home',
  }
]

export const WalletModalContent = ({ closeModalHandler }: IProps) => {
  // @ts-ignore
  const { topUpToContinue } = useGetPhrases(['topUpToContinue'])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>{topUpToContinue}</p>
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