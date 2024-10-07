import classNames from 'classnames/bind'

import { MainHeader, MainFooter, Chart } from '../../widgets'

import { GameSocketProvider } from '../../app/providers'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  return (
    <GameSocketProvider>
      <main className={cx('main')}>
        <MainHeader />
        {/* <Chart /> */}
        <MainFooter />
      </main>
    </GameSocketProvider>
  )
}