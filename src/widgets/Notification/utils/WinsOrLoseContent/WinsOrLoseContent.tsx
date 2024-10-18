import classNames from 'classnames/bind'
import { useTonAddress } from '@tonconnect/ui-react'

import styles from './WinsOrLoseContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  type: string
  tons: number
}

export const WinsOrLoseContent = ({ type, tons }: IProps) => {
  const address = useTonAddress()
  const isWins = type === 'wins'

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h2>Wallet</h2>
        <p>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</p>
      </div>
      <div className={cx('container', 'right', type)}>
        <h2 className={cx(type)}>{isWins ? 'received' : 'spent'}</h2>
        <p className={cx(type)}>{isWins ? '+' : '-'} {tons} TON</p>
      </div>
    </div>
  )
}