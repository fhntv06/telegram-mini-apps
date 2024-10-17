import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import { Button, Select } from '../../../../shared'
import classNames from 'classnames/bind'
import { ButtonConnectWallet } from '../../../../feature'
import { useGetPhrases } from '../../../../hooks'

import styles from './BurgerModalContent.module.scss'

const cx = classNames.bind(styles)

const languages = [
  {
    text: 'english',
    icon: 'flag-uk',
    action: 'set-lang'
  },
  {
    text: 'spanish',
    icon: 'flag-spanish',
    action: 'set-lang'
  },
  {
    text: 'chinese',
    icon: 'flag-china',
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
    text: 'topUp',
    icon: 'plus',
    onClick: () => alert('Top up!'),
    blockSelect: true,
  },
  {
    text: 'disconnect',
    icon: 'disconnect',
    blockSelect: true,
    action: 'disconnect'
  }
]

export const BurgerModalContent = () => {
  const wallet = useTonWallet()
	const address = useTonAddress()  

  // @ts-ignore
  const { affiliate, technicalSupport } = useGetPhrases(['affiliate', 'technicalSupport'])

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
        <p>{affiliate}</p>
      </Button>
      <Button
        className={cx('button__menu')}
        iconLeftName='support'
        iconRightName='arrow-right'
        sizeIcons='big'
        href='https://t.me/pulse_social/7'
      >
        <p>{technicalSupport}</p>
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