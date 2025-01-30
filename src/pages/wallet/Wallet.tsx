import { useEffect, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { motion } from 'framer-motion'
import classNames from 'classnames/bind'

import { useDisconnect, useGetPhrases, useSelector, useSetBalance } from '../../hooks'
import { ButtonConnectWallet, ButtonTopUp, ButtonWithDraw } from '../../feature'
import { Button, Icon } from '../../shared'

import styles from './Wallet.module.scss'

const cx = classNames.bind(styles)

export const Wallet = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const { topUp, copied, balance } = useGetPhrases(['topUp', 'copied', 'balance'])
  const address = useTonAddress()
  const handlerDisconnect = useDisconnect()
  const { balance: balanceUser, updateBalance } = useSetBalance()
  const { settings: { isFullscreen } } = useSelector((state) => state.settings)

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

  useEffect(() => {
    updateBalance()
  }, [])

  return (
    <div className={cx('page', 'page-wallet', { 'isFullscreen': isFullscreen })}>
      <header className={cx('page-wallet__header')}>
        <h2 className='h2-big'>{balance}</h2>
        <div className={cx('page-wallet__balance')}>
          {<Icon name='stars-1' size='big' />}
          <h1>{balanceUser}</h1>
        </div>
      </header>
      <main className={cx('page__main')}>
        <div className={cx('container', 'container__buttons')}>
          { address ? (
            <>
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
                  animate={{ opacity: Number(isCopied) }}
                >
                  {copied}
                </motion.h2>
                <p>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</p>
              </Button>
              <Button onClick={handlerDisconnect} iconLeftName='disconnect' sizeIcons='big' />
            </>
          ) : (
            <ButtonConnectWallet className={cx({ 'hide': address })} sizeIcons='big' />
          ) }
        </div>
        <div className={cx('container')}>
          <header>
            <p>{topUp}</p>
          </header>
          <div className={cx('content')}>
            <ButtonTopUp sizeIcons='big' />
            <ButtonWithDraw />
          </div>
        </div>
      </main>
    </div>
  )
}
