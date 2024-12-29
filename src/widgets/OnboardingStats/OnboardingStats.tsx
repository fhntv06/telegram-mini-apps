import {useState, useRef, useEffect, useMemo} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import { EffectCreative } from 'swiper/modules'
import classNames from 'classnames/bind'
import { IOnboardingStats } from './types'
import { AnimationBlock } from '../'
import { useAnimation, useGetPhrases, useSelector } from '../../hooks'
import { Button, Counter } from '../../shared'

import styles from './OnboardingStats.module.scss'

const cx = classNames.bind(styles)

interface ICeilParam {
  phrase: string
  counter: number
  multiplier: number
  fixedNumber?: number
}

interface ICeilParams {
  data: ICeilParam[]
}

const screens = [
  {
    id: 1,
    type: 'daysInRow',
  },
  {
    id: 2,
    type: 'multiplier'
  }
]

const delayAnimationBetweenScreens = 3.5

const CeilParams = ({ data }: ICeilParams) => {
  return (
    <div className={cx('ceil-params')}>
      {data.map((item, index) => {
        const durationTranslate = .6
        const delayTranslate = .2 * index + delayAnimationBetweenScreens

        return (
          <motion.div
            key={item.phrase}
            className={cx('ceil-params__container')}
            initial={{ opacity: 0, translateY: '100%' }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              delay: delayTranslate,
              duration: durationTranslate,
              ease: 'easeIn',
            }}
          >
            <motion.div
              className={cx('ceil-params__container')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: (durationTranslate + delayTranslate),
                duration: .5,
                ease: 'easeIn',
              }}
            >
              <Counter className='color-ton-coin font-w-regular' to={item.multiplier} prefix={'×'} fixedNumber={2} />
            </motion.div>
            <div className={cx('ceil-params__ceil')}>
              <p className='p-medium center-text'>{item.phrase}</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: .2,
                  duration: .5,
                  ease: 'easeIn',
                }}
              >
                <Counter className='p p-big color-ton-coin font-w-regular' to={item.counter} fixedNumber={item?.fixedNumber || 0} />
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export const OnboardingStats = ({ handlerSkip, className }: IOnboardingStats) => {
  const swiperRef = useRef(null)
  const { totalBets, daysInRow, invitedFriends, multiplierData } = useSelector((state) => state.retrievesData)
  const [daysInRowSlide, setDaysInRowSlide] = useState<number>(daysInRow - 1)
  const [indexSlider, setIndexSlider] = useState<number>(0)

  const {
    daysInTheGame, multiplierToday, logInToTheGame, invitedFriends: phraseInvitedFriends,
    totalBets: phraseTotalBets, daysInARow, yourMultiplier, continue: phraseContinue
  } = useGetPhrases([
    'daysInTheGame', 'multiplierToday', 'logInToTheGame',
    'totalBets', 'daysInARow', 'yourMultiplier', 'continue', 'invitedFriends'
  ])
  const { type, openHandler } = useAnimation()

  const continueHandler = () => {
    handlerSkip(true)
  }

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setDaysInRowSlide((prev) => prev + 1)
      openHandler('wins')
    }, 1000)

    const timer2 = setTimeout(() => {
      // @ts-ignore
      swiperRef.current.slideNext()
      setIndexSlider(1)
    }, delayAnimationBetweenScreens * 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const ceilParamsData = useMemo(() => [
    {
      phrase: phraseTotalBets,
      counter: totalBets,
      multiplier: multiplierData.bets,
      fixedNumber: 1
    },
    {
      phrase: daysInARow,
      counter: daysInRow,
      multiplier: multiplierData.daily,
    },
    {
      phrase: phraseInvitedFriends,
      counter: invitedFriends,
      multiplier: multiplierData.refs,
    }
  ], [daysInARow, daysInRow, invitedFriends, multiplierData.bets, multiplierData.daily, multiplierData.refs, totalBets])

  useEffect(() => {
    console.log({ceilParamsData})
  }, []);


  // TODO: переделать концепцию без слайдера просто на двух экранах!
  return (
    <div className={cx('onboarding', 'onboarding-stats', className)}>
      <div className={cx('onboarding__screen', 'onboarding-stats__wrapper')}>
        <Swiper
          className={cx('onboarding__slider', 'onboarding-stats__slider')}
          wrapperClass={cx('onboarding__slider__wrapper', 'onboarding-stats__slider__wrapper')}
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['0', 0, -1],
            },
            next: {
              translate: ['100%', 0, 1],
            },
          }}
          modules={[EffectCreative]}
          onSwiper={(swiper) => {
            // @ts-ignore
            swiperRef.current = swiper
          }}
          initialSlide={indexSlider}
          centeredSlides={true}
          spaceBetween={16}
          allowTouchMove={false}
        >
          {screens.map((item) => (
            <div key={`onboarding-stats-screen_${item.id}`} className={cx('onboarding-stats__screen')}>
              <SwiperSlide className={cx('onboarding-stats__screen__slide')}>
                <header>
                  <div className={cx('onboarding-stats__screen__counter')}>
                    {
                      (item.type === 'daysInRow') ? (
                        <h1 className={cx('h1-large', { 'color-ton-coin': daysInRow === daysInRowSlide })}>{daysInRowSlide}</h1>
                      ) : (
                        <Counter
                          className={'h1-large color-ton-coin font-w-regular'}
                          to={multiplierData.totalMultiplier}
                          prefix={item.type === 'multiplier' ? '×' : ''}
                          animation={indexSlider === 1}
                          fixedNumber={2}
                        />
                      )
                    }
                    <p className='p-large p-reg'>{item.type === 'daysInRow' ? daysInTheGame : multiplierToday}</p>
                  </div>
                  {item.type === 'multiplier' && <CeilParams data={ceilParamsData} />}
                  <p className={cx('onboarding-stats__screen__text', 'text', 'p-big p-reg')}>{item.type === 'daysInRow' ? logInToTheGame : yourMultiplier}</p>
                </header>
                {
                  (item.type === 'multiplier') && (
                    <footer>
                      <Button
                        className={cx('onboarding-stats-screen__button-continue')}
                        type='blue'
                        onClick={() => continueHandler()}
                      >
                        <p>{phraseContinue}</p>
                      </Button>
                    </footer>
                  )
                }
                {(item.type === 'daysInRow') && <AnimationBlock animation={type}/>}
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
