import classNames from 'classnames/bind'

import { MainHeader, MainFooter, Chart } from '../../widgets'

import { GameSocketProvider } from '../../app/providers'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

const dataFooter = {
  dataUp: {
    persons: [
      {
        wallet: 'John',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
        bet: 10
      },
    ],
    tonTotal: 1000000000 * 10 // 1 000 000 000 nano ton
  },
  dataDown: {
    persons: [
      {
        wallet: 'John',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj,
        bet: 1000000000 * 5
      }
    ],
    tonTotal: 1000000000 * 5
  },
  rounds: [
    {
      id: 0,
      status: true
    }
  ],
  livePlayers: 100000,
  allTimeWins: 100000000
}

export const Main = () => {
  return (
    <GameSocketProvider>
      <main className={cx('main')}>
        <MainHeader />
        <Chart />
        <MainFooter data={dataFooter} />
      </main>
    </GameSocketProvider>
  )
}