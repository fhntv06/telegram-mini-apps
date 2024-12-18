import classNames from 'classnames/bind'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

export const Menu = () => {
  return (
    <div className={cx('page')}>
      <h1>Menu Page</h1>
    </div>
  )
}
