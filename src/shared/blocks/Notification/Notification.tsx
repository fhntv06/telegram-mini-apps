import { useTonAddress } from '@tonconnect/ui-react'
import classNames from "classnames/bind";
import { Icon } from '../../'

import styles from './Notification.module.scss'

import { getWalletBet}  from '../../../app/api/user'

const cx = classNames.bind(styles)

interface IProps {
  type?: 'warning' | 'wins' | 'lose'
}

export const Notification = ({ type }: IProps) => {
  const address = useTonAddress()


  return (
    <div className={cx('wrapper', type)}>
      <Icon name='warning' />
      <p>Your an out of time to bet in this round, please wait for next round</p>
      <span><Icon name='cross' /></span>
    </div>
  )
}