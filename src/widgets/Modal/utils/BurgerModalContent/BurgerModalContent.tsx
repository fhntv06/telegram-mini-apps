import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import { Button, Select } from '../../../../shared'
import classNames from 'classnames/bind'
import { ButtonConnectWallet } from '../../../../feature'

import styles from './BurgerModalContent.module.scss'

const cx = classNames.bind(styles)

const languages = [
  {
    text: 'english',
    icon: 'flag-uk',
    action: 'set-lang'
  },
  {
    text: 'france',
    icon: 'flag-france',
    action: 'set-lang'
  },
  {
    text: 'germany',
    icon: 'flag-germany',
    action: 'set-lang'
  },
  {
    text: 'russian',
    icon: 'flag-russia',
    action: 'set-lang'
  }
]

const walletData = [
  {
    text: 'Top up',
    icon: 'plus',
    onClick: () => alert('Top up!'),
    blockSelect: true,
  },
  {
    text: 'Disconnect',
    icon: 'disconnect',
    blockSelect: true,
    action: 'disconnect'
  }
]

export const BurgerModalContent = () => {
  const wallet = useTonWallet()
	const address = useTonAddress()  

  return (
    <div className={cx('wrapper')}>
      {wallet
        ? <Select data={[
          {
            text: `${address.slice(0, 4)}...${address.slice(address.length - 4)}`,
            icon: 'wallet',
            blockSelect: false,
            action: ''
          }, ...walletData
        ]}/>
        : <ButtonConnectWallet className={cx('button__menu')} iconRightName='plus' sizeIcons='big' />
      }
      <Button
        className={cx('button__menu')}
        iconLeftName='handshake'
        iconRightName='arrow-right'
        sizeIcons='big'
        href='https://t.me/CryptoPulseTest_bot'
      >
        <p>Affiliate</p>
      </Button>
      <Button
        className={cx('button__menu')}
        iconLeftName='support'
        iconRightName='arrow-right'
        sizeIcons='big'
        href='https://t.me/pulse_social/7'
      >
        <p>Technical support</p>
      </Button>
      <Select data={languages} />
      <div className={cx('button__social')}>
        <Button
          className={cx('button__social__item')}
          iconLeftName='x-twitter'
          sizeIcons='big'
          href='/'
        />
        <Button
          className={cx('button__social__item')}
          iconLeftName='telegram'
          sizeIcons='big'
          href='/'
        />
        <Button
          className={cx('button__social__item')}
          iconLeftName='facebook'
          sizeIcons='big'
          href='/'
        />
        <Button
          className={cx('button__social__item')}
          iconLeftName='instagram'
          sizeIcons='big'
          href='/'
        />
      </div>
    </div>
  )
}