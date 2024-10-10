import { TonConnectButton } from '@tonconnect/ui-react'
import { Button } from '../../../../shared'
import classNames from 'classnames/bind'
import styles from './WalletModalContent.module.scss'


const cx = classNames.bind(styles)

export const WalletModalContent = () => {
  return (
    <>
      <TonConnectButton className={cx('TonConnectButton')} />
      <Button
        iconLeftName='handshake'
        iconRightName='arrow-right'
        sizeIcons='small'
      >
        Affiliate
      </Button>
    </>
  )
}