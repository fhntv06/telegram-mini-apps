import classNames from 'classnames/bind'

import styles from './Tasks.module.scss'

const cx = classNames.bind(styles)

export const Tasks = () => {
  return (
    <div className={cx('page')}>
      <h1>Tasks Page</h1>
    </div>
  )
}
