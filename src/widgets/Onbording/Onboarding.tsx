import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from 'classnames/bind'
import { AnimatePresence, motion, useWillChange } from 'framer-motion'
import {
  IOnbording,
  // IScreen
} from './types'

import { useGetPhrases, useChangeGameMode } from '../../hooks'
import { Button, Icon } from '../../shared'

import styles from './Onbording.module.scss'
import { SelectHorizontal } from '../../shared/ui/SelectHorizontal'
import { isDemoMode } from '../../shared/constants'

const cx = classNames.bind(styles)

const screens = [1, 2, 3, 4, 5, 6]

export const Onboarding = ({ handlerSkip, className }: IOnbording) => {
  const swiperRef = useRef(null)
  const willChange = useWillChange()
  const [startOnboarding, setStartOnboarding] = useState<boolean>(false)
  const [disabledPrevButton, setDisabledPrevButton] = useState<boolean>(true)
  const [indexSlideActive, setIndexSlideActive] = useState<number>(1)
  const changeGameMode = useChangeGameMode()

  const {
    // @ts-ignore
    onboarding, start, prev, next, skip, begin,
    // @ts-ignore
    realMode, gameWithRealTONCoins, demoMode, learningWithNonRealCoins, selectGameMode
  } = useGetPhrases([
    'onboarding', 'start', 'prev',
    'next', 'skip', 'begin',
    'realMode', 'gameWithRealTONCoins', 'demoMode',
    'learningWithNonRealCoins', 'selectGameMode'
  ])

  return (
    <div className={cx('onboarding', className)}>
      {
        <AnimatePresence>
          {startOnboarding ? (
            <motion.div
              className={cx('onboarding__screen')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: .2,
                duration: .3,
                ease: 'easeIn',
              }}
            >
              <div className={cx('onboarding__screen__header')}>
                <div className={cx('onboarding__screen__pagination')}>
                  {indexSlideActive} / {screens.length}
                  <button className='p p-reg' onClick={() => handlerSkip(true)}>{skip}</button>
                </div>
              </div>
              <Swiper
                className={cx('onboarding__slider')}
                wrapperClass={cx('onboarding__slider__wrapper')}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  if (swiper) {
                    setIndexSlideActive(swiper.realIndex + 1)
                    setDisabledPrevButton(swiper.realIndex === 0)
                  }
                }}
                onSwiper={(swiper) => {
                  // @ts-ignore
                  swiperRef.current = swiper
                }}
                initialSlide={0}
                centeredSlides={true}
                spaceBetween={16}
              >
                {screens.map((index) => (
                  <div key={`screen_${index}`} className={cx('onboarding__screen')}>
                    <SwiperSlide className={cx('onboarding__screen__main')}>
                      {
                        (index === 6) ? (
                          <div className={cx('onboarding__screen__custom-content')}>
                            <h1>{selectGameMode}</h1>
                            <SelectHorizontal
                              changeId={isDemoMode}
                              textBtnLeft={realMode}
                              textDescrBtnLeft={gameWithRealTONCoins}
                              textBtnRight={demoMode}
                              textDescrBtnRight={learningWithNonRealCoins}
                              onClickLeftBtn={() => changeGameMode()}
                              onClickRightBtn={() => changeGameMode(isDemoMode)}
                            />
                            <p className={cx('text', 'p-reg')}>{onboarding[index]}</p>
                          </div>
                        ) : (
                          <>
                            <div className={cx('screen')}>
                              <div className={cx(`screen__${index}`)}/>
                            </div>
                            <p className={cx('text', 'p-reg')}>{onboarding[index]}</p>
                          </>
                        )}
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
              <div className={cx('onboarding__screen__footer')}>
                <div className={cx('onboarding__screen__control')}>
                  <Button
                    className={cx('button', 'p')}
                    iconLeftName='arrow-left'
                    sizeIcons='big'
                    onClick={() => {
                      // @ts-ignore
                      swiperRef.current.slidePrev()
                    }}
                    disabled={disabledPrevButton}
                  >
                    {prev}
                  </Button>
                  {indexSlideActive !== screens.length ? (
                    <Button
                      className={cx('button', 'p')}
                      type='white'
                      sizeIcons='big'
                      onClick={() => {
                        // @ts-ignore
                        swiperRef.current.slideNext()
                      }}
                    >
                      {next}
                      <svg id="arrow-right-black" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M15.7605 11.356C16.0798 11.7117 16.0798 12.2883 15.7605 12.644L9.39578 19.7333C9.07647 20.0889 8.55878 20.0889 8.23948 19.7333C7.92018 19.3776 7.92018 18.801 8.23948 18.4453L14.0261 12L8.23948 5.55467C7.92017 5.19901 7.92017 4.62239 8.23948 4.26674C8.55878 3.91109 9.07647 3.91109 9.39577 4.26674L15.7605 11.356Z"
                              fill="#1C1C1E"/>
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      className={cx('button', 'button-begin', 'p')}
                      type='white'
                      onClick={() => handlerSkip(true)}
                    >
                      {begin}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={cx('onboarding__screen')}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{
                delay: .1,
                duration: .3,
                ease: 'easeIn',
              }}
              style={{willChange}}
            >
              <div className={cx('screen', 'main')}/>
              <div className={cx('onboarding__screen__header', 'main')}>
                <Icon name='logo-pulse' size='logo'/>
              </div>
              <div className={cx('onboarding__screen__footer', 'main')}>
                <p className={cx('text')}>{onboarding[0]}</p>
                <Button
                  className={cx('button', 'p')}
                  type='white' onClick={() => setStartOnboarding(true)}
                >
                  {start}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      }
    </div>
  )
}
