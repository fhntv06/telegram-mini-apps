import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import {
  Select, Icon, Button, sourceCryptoBot, sourceWallet, sourceKotleta,
  sourceOnemoment, sourceAltinbit, sourceBitobmen, sourcePaybis
} from '../../../../shared'

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
    name: 'P2PMarket',
    icon: 'market',
  },
  {
    name: 'send',
    icon: sendIcon,
    blockSelect: true,
    onClick: () => window.location.href = sourceCryptoBot,
  },
  {
    name: 'wallet',
    icon: walletIcon,
    blockSelect: true,
    onClick: () => window.location.href = sourceWallet,
  }
]
const TopUpByCardCIS = [
  {
    name: 'TopUpByCardCIS',
    icon: 'card',
  },
  {
    name: 'kotleta',
    icon: 'kotleta',
    blockSelect: true,
    onClick: () => window.location.href = sourceKotleta,
  },
  {
    name: 'oneMoment',
    icon: 'oneMoment',
    blockSelect: true,
    onClick: () => window.location.href = sourceOnemoment,
  },
  {
    name: 'altinBit',
    icon: 'altinBit',
    blockSelect: true,
    onClick: () => window.location.href = sourceAltinbit,
  },
  {
    name: 'bitObmen',
    icon: 'bitObmen',
    blockSelect: true,
    onClick: () => window.location.href = sourceBitobmen,
  }
]
const TopUpByCard = [
  {
    name: 'TopUpByCard',
    icon: 'card',
  },
    {
    name: 'paybis',
    icon: 'paybis',
    blockSelect: true,
    onClick: () => window.location.href = sourcePaybis,
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
      })
  }

  const { topUpToContinue, yourWallet, copied } = useGetPhrases(['topUpToContinue', 'yourWallet', 'copied'])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>{topUpToContinue}</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big'/></span>
        </header>
        <div className={cx('content')}>
          <Select data={marketData} typeStyle='light'/>
          <Select data={TopUpByCardCIS} typeStyle='light'/>
          <Select data={TopUpByCard} typeStyle='light'/>
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
            <p>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
