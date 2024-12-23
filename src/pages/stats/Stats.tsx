import classNames from 'classnames/bind'

import { useGetPhrases } from '../../hooks'
import { Button } from '../../shared'

import { formatNumber } from '../../shared'

import styles from './Stats.module.scss'

const cx = classNames.bind(styles)

const arLeaderboard: {
  id: number,
  number: number,
  name: string,
  total: number
}[] = [
  {
    id: 1,
    number: 1,
    name: 'Donald Trump',
    total: 432654655
  },
  {
    id: 2,
    number: 2,
    name: 'Penetrator228',
    total: 367165333
  },
  {
    id: 3,
    number: 3,
    name: 'Crypto_Giant',
    total: 302212901
  },
  {
    id: 4,
    number: 4,
    name: 'Jackkkk',
    total: 291876006
  },
  {
    id: 5,
    number: 5,
    name: 'Max-Klass',
    total: 267876006
  },
  {
    id: 6,
    number: 6,
    name: 'Max-123',
    total: 142621006
  },
  {
    id: 7,
    number: 7,
    name: 'Rapter-321',
    total: 101210000
  },
  {
    id: 8,
    number: 8,
    name: 'Grow',
    total: 54168310
  }
]

const placeInLeaderboard = 8
const points = 112345644

export const Stats = () => {
  const { pulsePoints, placeInLeaderboard: phrasePlaceInLeaderboard, leaderboard } = useGetPhrases(['pulsePoints', 'placeInLeaderboard', 'leaderboard'])

  return (
    <div className={cx('page', 'page-stats')}>
      <div className={cx('page-stats__header')}>
        <h1 className='font-w-semibold'>{pulsePoints}</h1>
        <div className={cx('page-stats__poinst')}>
          <h1 className='color-ton-coin'>{formatNumber(points)}</h1>
          <p className='p-small p-reg'>{placeInLeaderboard}{phrasePlaceInLeaderboard}</p>
        </div>
      </div>
      <main className={cx('page__main')}>
        <div className={cx('container', 'container__buttons')}>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Multiplier</p>
              <p className='p-reg color-ton-coin'>x 5.5</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Total bets</p>
              <p className='p-reg color-ton-coin'>103</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Days in game in row</p>
              <p className='p-reg color-ton-coin'>4</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Referred friends</p>
              <p className='p-reg color-ton-coin'>2</p>
            </div>
          </Button>
        </div>
        <div className={cx('container')}>
          <header>
            <p>{leaderboard}</p>
          </header>
          <div className={cx('page-stats__leaderboard')}>
            {arLeaderboard.map(({ id, number, name, total }) => (
              <div key={id} className={cx('page-stats__leaderboard__item')}>
                <div className={cx('page-stats__leaderboard__item__content')}>
                  <p className={cx('page-stats__leaderboard__number', 'font-w-semibold')}>{number}</p>
                  <p className={cx('page-stats__leaderboard__name', 'p-reg')}>{name}</p>
                </div>
                <p className={cx('page-stats__leaderboard__item__total', 'p-reg')}>{formatNumber(total)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
