import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import { Button, Select } from '../../../../shared'
import classNames from 'classnames/bind'
import { ButtonConnectWallet } from '../../../../feature'
import { useGetPhrases } from '../../../../hooks'
import { arLanguagesSite } from '../../../../shared/constants'

import styles from './BurgerModalContent.module.scss'

const cx = classNames.bind(styles)

const walletData = [
  {
    name: 'topUp',
    icon: 'plus',
    onClick: () => console.log('Top up!'),
    blockSelect: true,
  },
  {
    name: 'disconnect',
    icon: 'disconnect',
    blockSelect: true,
    action: 'disconnect'
  }
]

export const BurgerModalContent = () => {
  const wallet = useTonWallet()
	const address = useTonAddress()
  const language= useSelector((state: any) => state.language)

  // @ts-ignore
  const { affiliate, technicalSupport } = useGetPhrases(['affiliate', 'technicalSupport'])

  const languages = useMemo(() => [language].concat(arLanguagesSite.filter((item) => item.name != language.name)), [language.name])

  return (
    <div className={cx('wrapper')}>
      {wallet
        ? <Select data={[
          {
            name: `${address.slice(0, 4)}...${address.slice(address.length - 4)}`,
            customText: true,
            icon: 'wallet',
            blockSelect: false,
            active: true,
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