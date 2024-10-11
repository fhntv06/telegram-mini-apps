import { useSelector } from 'react-redux'
import { Button, Select } from '../../../../shared'
import classNames from 'classnames/bind'
import styles from './BurgerModalContent.module.scss'
import { ButtonConnectWallet } from '../../../../feature'

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
  const { wallet, address } = useSelector((state: any) => state.user)

  walletData.unshift({
    text: `${address.slice(0, 4)}...${address.slice(address.length - 4)}`,
    icon: 'wallet',
    blockSelect: false,
    action: ''
  })

  return (
    <div className={cx('wrapper')}>
      {wallet
        ? <Select data={walletData}/>
        : <ButtonConnectWallet className={cx('button__menu')} iconRightName='plus' sizeIcons='big' />
      }
      <Button
        className={cx('button__menu')}
        iconLeftName='handshake'
        iconRightName='arrow-right'
        sizeIcons='big'
        href='/'
      >
        <p>Affiliate</p>
      </Button>
      <Button
        className={cx('button__menu')}
        iconLeftName='support'
        iconRightName='arrow-right'
        sizeIcons='big'
        href='/'
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