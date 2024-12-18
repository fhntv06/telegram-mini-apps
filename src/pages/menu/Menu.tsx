import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'

import { useGetPhrases } from '../../hooks'

import {
  Button, Select,
  arLanguagesSite, sourcePulseGameSupport, sourcePulseReferralBot
} from '../../shared'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

export const Menu = () => {
  const language= useSelector((state: any) => state.language)

  const { affiliate, technicalSupport } = useGetPhrases([
    'affiliate', 'technicalSupport', 'realMode',
    'gameWithRealTONCoins', 'demoMode', 'learningWithNonRealCoins'
  ])

  const languages = useMemo(() => [language].concat(arLanguagesSite.filter((item) => item.name != language.name)), [language.name])

  return (
    <div className={cx('page', 'page-menu')}>
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
        href={sourcePulseGameSupport}
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
