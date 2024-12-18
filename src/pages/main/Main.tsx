import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { MainFooter, Chart, ModalSelectGameMode } from '../../widgets'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  const [hiddenModalSelectMode, setHiddenModalSelectMode] = useState<boolean>(true)

  useEffect(() => {
    setHiddenModalSelectMode(false)
  }, [])

  return (
    <>
      <main className={cx('main')}>
        <Chart/>
        <MainFooter/>
      </main>
      {!hiddenModalSelectMode && (
        <ModalSelectGameMode isOpen={!hiddenModalSelectMode} closeHandler={setHiddenModalSelectMode}/>
      )}
    </>
  )
}
