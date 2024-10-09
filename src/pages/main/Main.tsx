import { Provider } from 'react-redux';
import store from '../../app/store';
import classNames from 'classnames/bind'

import { MainHeader,
  MainFooter,
  // Chart,
} from '../../widgets'

import {
  GameSocketProvider,
  ModalProvider
} from '../../app/providers'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  return (
    <Provider store={store}>
      <GameSocketProvider>
        <ModalProvider>
          <main className={cx('main')}>
            <MainHeader />
            {/*<Chart />*/}
            <MainFooter />
          </main>
        </ModalProvider>
     </GameSocketProvider>
    </Provider>
  )
}