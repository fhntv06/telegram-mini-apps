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
        bet: 1000000000 * 5
      },
      {
        wallet: 'Jane',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Quincy',
        img: 'https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Andrew',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Tom',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Bob',
        img: 'https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Nick',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
        bet: 1000000000 * 5
      },
    ],
    tonTotal: 1000000000 * 10 // 1 000 000 000 nano ton
  },
  dataDown: {
    persons: [
      {
        wallet: 'John',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Andrew',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
        bet: 1000000000 * 5
      },
      {
        wallet: 'Tom',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
        bet: 1000000000 * 5
      },
      {
        wallet: 'John1',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
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