import {useEffect, useState} from 'react'
import classNames from 'classnames/bind'
import { AnimationProvider, ModalProvider } from '../../app/providers'
import { MainFooter, Chart, OnboardingStats } from '../../widgets'
import {AnimationWrapper, getStorage, msInDay, setStorage} from '../../shared'

import styles from './Main.module.scss'

const cx = classNames.bind(styles)

export const Main = () => {
  const [skipOnBoarding, setSkipOnBoarding] = useState<boolean>(false)
  const [visibleOnboarding, setCheckConditionToVisibleOnboarding] = useState<boolean>(false)

  useEffect(() => {
    const timeStampLastVisibleOnboarding = Number(getStorage('visibleOnboarding'))

    if (timeStampLastVisibleOnboarding) {
      // setCheckConditionToVisibleOnboarding((new Date().getTime() - timeStampLastVisibleOnboarding) > msInDay)
      setCheckConditionToVisibleOnboarding((new Date().getTime() - timeStampLastVisibleOnboarding) > 1000 * 10)
    } else {
      setCheckConditionToVisibleOnboarding(true)
    }

    setStorage('visibleOnboarding', new Date().getTime().toString())
  }, [])

  return (
    <ModalProvider>
      <AnimationProvider>
        <main className={cx('main')}>
          <Chart/>
          <MainFooter/>
        </main>
        <AnimationWrapper
          isOpen={!skipOnBoarding && visibleOnboarding}
          style={{ zIndex: 100, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
          initial={{ translateX: 0 }}
          animate={{}}
          exit={{ translateX: '-100%' }}
        >
          <OnboardingStats handlerSkip={setSkipOnBoarding} />
        </AnimationWrapper>
      </AnimationProvider>
    </ModalProvider>
  )
}
