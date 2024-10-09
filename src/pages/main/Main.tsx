import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind'

import { MainHeader, MainFooter, Chart } from '../../widgets'

import { ModalProvider } from '../../app/providers'

import styles from './Main.module.scss'
import { useGameSocket, usePriceHistory } from '../../hooks/'
import { setGameStatus } from '../../app/store/slices/game'

const cx = classNames.bind(styles)

export const Main = () => {
  const dispatch = useDispatch();
  const data = useGameSocket()
  const priceHistory = usePriceHistory()

  useEffect(() => {
    dispatch(setGameStatus({ ...data, priceHistory}))
  }, [data]);

  return (
    <ModalProvider>
      <main className={cx('main')}>
        <MainHeader />
        <Chart />
        <MainFooter />
      </main>
    </ModalProvider>
  )
}