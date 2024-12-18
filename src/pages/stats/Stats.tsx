import classNames from 'classnames/bind'

import styles from './Stats.module.scss'

const cx = classNames.bind(styles)

export const Stats = () => {
  return (
    <div className={cx('page')}>
      <h1>Stats Page</h1>
    </div>
  )
}
