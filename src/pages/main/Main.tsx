import classNames from 'classnames/bind'
import styles from './Main.module.scss'

import { MainHeader, MainFooter, Graf } from '../../widgets'

const cx = classNames.bind(styles)

export const Main = () => {
    return (
      <main className={cx('main')}>
        <MainHeader />
        <Graf />
        <MainFooter />
      </main>
    )
}