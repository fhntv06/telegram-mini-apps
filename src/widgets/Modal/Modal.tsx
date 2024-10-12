import React from 'react'
import classNames from 'classnames/bind'

import styles from './Modal.module.scss'

import { IModalTypes } from './types'
import { ButtonChangeMode, ButtonWallet, ButtonBurger } from '../../feature'

const cx = classNames.bind(styles)

interface IProps {
  isOpen: boolean,
  typeModal: IModalTypes,
  onClick: () => void,
  children: React.ReactNode
}

export const Modal = ({
  isOpen = false,
  typeModal = 'burger',
  onClick,
  children
}: IProps) => {

  return (
    <div className={cx('modal', { isOpen: isOpen })}>
      <header className={cx('modal__header')}>
        <div className={cx('modal__header__buttons', typeModal)}>
          <ButtonChangeMode
            className={cx('modal__button-select__mode', { active: typeModal === 'select__mode' })}
            isActive={typeModal === 'select__mode'}
            onClick={onClick}
          />
          <ButtonWallet
            className={cx('modal__button-wallet', { active: typeModal === 'wallet' })}
            isActive={typeModal === 'wallet'}
            onClick={onClick}
          />
        </div>
        <ButtonBurger
          className={cx('modal__button-burger', { active: typeModal === 'burger' })}
          isActive={typeModal === 'burger'}
          onClick={onClick}
        />
      </header>
      {children}
    </div>
  )
}