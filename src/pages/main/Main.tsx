import classNames from 'classnames/bind'
import styles from './Main.module.scss'

import { MainHeader, MainFooter, Graf } from '../../widgets'

const cx = classNames.bind(styles)

const dataGraf: any = []

const dataFooter = {
  dataUp: {
    persons: [
      {
        name: 'John',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        name: 'Jane',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
      },
      {
        name: 'Quincy',
        img: 'https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png'
      },
      {
        name: 'Andrew',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
      },
      {
        name: 'Tom',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        name: 'Bob',
        img: 'https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png'
      },
      {
        name: 'Nick',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        name: 'Charlie',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
      }
    ],
    tonTotal: 10
  },
  dataDown: {
    persons: [
      {
        name: 'John',
        img: 'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        name: 'Jane',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
      },
      {
        name: 'Quincy',
        img: 'https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png'
      },
      {
        name: 'Andrew',
        img: 'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
      }
    ],
    tonTotal: 5
  },
  rounds: [
    {
      id: 0,
      status: true
    },
    {
      id: 1,
      status: false
    },
    {
      id: 2,
      status: true
    }
  ],
  liveLayers: 100000,
  allTimeWins: 100000000
}

export const Main = () => {
    return (
      <main className={cx('main')}>
        <MainHeader />
        <Graf data={dataGraf} />
        <MainFooter data={dataFooter} />
      </main>
    )
}