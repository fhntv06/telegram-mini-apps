import classNames from 'classnames/bind'

import styles from './Notification.module.scss'
import React from "react";

const cx = classNames.bind(styles)

interface IProps {
  type?: 'warning' | 'wins' | 'lose'
  isOpen: boolean,
  children: React.ReactNode
}

export const Notification = ({
  isOpen = false,
  type = 'warning',
  children
}: IProps) => {
  return (
    <div className={cx('wrapper', type, { isOpen: isOpen })}>
      {children}
    </div>
  )
}