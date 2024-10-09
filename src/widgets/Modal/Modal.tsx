import classNames from 'classnames/bind'
import styles from './Modal.module.scss'

import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature'

const cx = classNames.bind(styles)

interface IProps {
  button: 'burger' | 'select__mode' | 'wallet',
  onClick: () => void,
  children: React.ReactNode
}

export const Modal = ({ button, onClick, children }: IProps) => {
  return (
    <div className={cx('modal')}>
      <header className={cx('modal__header')}>
        <div className={cx('modal__header__button', button)}>
          <ButtonChangeMode className={cx('modal__button-select__mode', { active: button === 'select__mode' })} isOpen={button === 'select__mode'} onClick={onClick} />
          <ButtonWallet className={cx('modal__button-wallet', { active: button === 'wallet' })} isOpen={button === 'wallet'} onClick={onClick} />
        </div>
        <ButtonBurger className={cx('modal__button-burger', { active: button === 'burger' })} isOpen={button === 'burger'} onClick={onClick} />
      </header>
      {children}
    </div>
  )
}