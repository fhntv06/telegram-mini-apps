import classNames from 'classnames/bind'

import styles from './Wallet.module.scss'

const cx = classNames.bind(styles)

export const Wallet = () => {
  return (
    <div className={cx('page')}>
      <h1>Wallet Page</h1>
    </div>
  )
}
