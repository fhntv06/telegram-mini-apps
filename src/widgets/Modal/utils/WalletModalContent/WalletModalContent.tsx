import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { Select, Icon, Button } from '../../../../shared'

import { useGetPhrases } from '../../../../hooks'

import sendIcon from '../../../../shared/assets/send.png'
import walletIcon from '../../../../shared/assets/wallet.png'

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
    icon: sendIcon,
    blockSelect: true,
    onClick: () => window.location.href = 'https://t.me/CryptoBot',
  },
  {
    text: 'wallet',
    icon: walletIcon,
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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const address = useTonAddress()

  const handlerCopyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true);
        const timer = setTimeout(() => {
          setIsCopied(false)
          clearTimeout(timer)
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying address to clipboard:", error);
      });
  };

  // @ts-ignore
  const { topUpToContinue, yourWallet, copied } = useGetPhrases(['topUpToContinue', 'yourWallet', 'copied'])

  console.log(marketData)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>{topUpToContinue}</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big'/></span>
        </header>
        <div className={cx('content')}>
          <Select data={marketData} typeStyle='light'/>
          <Select data={exchangeData} typeStyle='light'/>
        </div>
      </div>
      <div className={cx('container')}>
        <header>
          <p>{yourWallet}</p>
        </header>
        <div className={cx('content')}>
          <Button
            className={cx('button__address')}
            iconLeftName='wallet'
            iconRightName='copy'
            sizeIcons='big'
            type='light'
            onClick={handlerCopyAddress}
          >
            <motion.h2
              className={cx('copy_text')}
              initial={{ opacity: 0 }}
              animate={isCopied ? { opacity: 1 } : { opacity: 0 }}
            >
              {copied}
            </motion.h2>
            {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
          </Button>
        </div>
      </div>
    </div>
  )
}