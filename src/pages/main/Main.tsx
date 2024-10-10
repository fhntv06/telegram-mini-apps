import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind'

import { MainHeader, MainFooter, Chart } from '../../widgets'

import { ModalProvider } from '../../app/providers'

import styles from './Main.module.scss'
import { useGameSocket, usePriceHistory } from '../../hooks/'
import { setGameStatus } from '../../app/store/slices/game'
import { LoaderSpinner } from '../../shared'

const cx = classNames.bind(styles)

export const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const data = useGameSocket()
  const priceHistory = usePriceHistory()

  useEffect(() => {
    if (data.btcPrice && priceHistory.length) {
      setIsLoading(false)
      dispatch(setGameStatus({ ...data, priceHistory}))
    }
  }, [data, priceHistory])

  return (
    isLoading
      ? <LoaderSpinner />
      : (
        <ModalProvider>
          <main className={cx('main')}>
            <MainHeader />
            <Chart />
            <MainFooter />
          </main>
        </ModalProvider>
      )
  )
}