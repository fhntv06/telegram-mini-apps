import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { ButtonConnectWallet } from '../../../../feature'
import { useGetPhrases } from '../../../../hooks'
import {
  Button, Select,
  arLanguagesSite, sourcePulseReferralBot, sourcePulseSocial
} from '../../../../shared'

import styles from './BurgerModalContent.module.scss'

const cx = classNames.bind(styles)

const walletData = [
  {
    name: 'topUp',
    icon: 'plus',
    blockSelect: true,
    action: 'topUp'
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

  const { affiliate, technicalSupport } = useGetPhrases([
    'affiliate', 'technicalSupport', 'realMode',
    'gameWithRealTONCoins', 'demoMode', 'learningWithNonRealCoins'
  ])

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
        href={sourcePulseReferralBot}
      >
        <p>{affiliate}</p>
      </Button>
      <Button
        className={cx('button__menu')}
        iconLeftName='support'
        iconRightName='arrow-right'
        sizeIcons='big'
        href={sourcePulseSocial}
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
