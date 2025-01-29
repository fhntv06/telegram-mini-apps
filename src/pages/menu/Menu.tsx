import { useMemo } from 'react'
import classNames from 'classnames/bind'
import { viewport } from '@telegram-apps/sdk'

import { useGetPhrases, useSelector } from '../../hooks'

import {
  Button, Select,
  arLanguagesSite, sourcePulseGameSupport, sourcePulseReferralBot
} from '../../shared'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

export const Menu = () => {
  const language= useSelector((state) => state.language)
  const languages = useMemo(() => [language].concat(arLanguagesSite.filter((item) => item.name != language.name)), [language])
  const { affiliate, technicalSupport, instruction } = useGetPhrases(['affiliate', 'technicalSupport', 'instruction'])

  return (
    <div className={cx('page', 'page-menu', { 'isFullscreen': viewport.isFullscreen() })}>
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
      <Button
        className={cx('button__menu')}
        iconLeftName='book'
        iconRightName='arrow-right'
        sizeIcons='big'
        href={'/instruction'}
      >
        <p>{instruction}</p>
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
