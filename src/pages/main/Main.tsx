import { Provider } from 'react-redux';
import store from '../../app/store';
import classNames from 'classnames/bind'

import { MainHeader,
  MainFooter,
  // Chart,
  Modal
} from '../../widgets'

// import { GameSocketProvider } from '../../app/providers'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  const handlerModal = () => {
    console.log('modal')
  }

  return (
    <Provider store={store}>
      {/* <GameSocketProvider> */}
        <main className={cx('main')}>
          <MainHeader />
          {/*<Chart />*/}
          <MainFooter />
          {/* переделать в контекст */}
          <Modal button='burger' onClick={handlerModal} > 
            <p>Modal</p>
          </Modal>
        </main>
      {/* </GameSocketProvider> */}
    </Provider>
  )
}