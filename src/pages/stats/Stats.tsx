import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import classNames from 'classnames/bind'

import {setLeaderboards, setUserRetrievesData} from '../../app/store/slices'
import { getLeaderboard, getRetrievesData } from '../../app/api'
import { useDispatch, useGetPhrases, useSelector } from '../../hooks'
import { formatNumber, Button } from '../../shared'
import { roundToFixed } from '../../shared/utils/formatNumber'

import styles from './Stats.module.scss'

const cx = classNames.bind(styles)

export const Stats = () => {
  const {
    pulsePoints, placeInLeaderboard: phrasePlaceInLeaderboard,
    leaderboard: phraseLeaderboard, multiplier: phraseMultiplier
  } = useGetPhrases(['pulsePoints', 'placeInLeaderboard', 'leaderboard', 'multiplier'])
  const { totalBets, daysInRow, invitedFriends, placeInLeaderboard, points, multiplierData } = useSelector((state) => state.retrievesData)
  const { leaderBord } = useSelector((state) => state.leaderboards)
  const dispatch = useDispatch()

  useEffect(() => {
    getRetrievesData(WebApp.initData)
      .then((retrievesData) => {
        dispatch(setUserRetrievesData(retrievesData.data))
      })
      .catch((error) => new Error('Error in getRetrievesData: ' + error))

    getLeaderboard()
      .then((res) => dispatch(setLeaderboards(res.data)))
      .catch((error) => new Error('Error in getTasks: ' + error))
  }, [])

  return (
    <div className={cx('page', 'page-stats')}>
      <div className={cx('page-stats__header')}>
        <h1 className='font-w-semibold'>{pulsePoints}</h1>
        <div className={cx('page-stats__points')}>
          <h1 className='color-ton-coin'>{formatNumber(points)}</h1>
          <p className='p-small p-reg'>{placeInLeaderboard}{phrasePlaceInLeaderboard}</p>
        </div>
      </div>
      <main className={cx('page__main')}>
        <div className={cx('container', 'container__buttons')}>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>{phraseMultiplier}</p>
              <p className='p-reg color-ton-coin'>x{roundToFixed(multiplierData.totalMultiplier)}</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Total bets</p>
              <p className='p-reg color-ton-coin'>{totalBets}</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Days in game in row</p>
              <p className='p-reg color-ton-coin'>{daysInRow}</p>
            </div>
          </Button>
          <Button iconRightName='arrow-right' sizeIcons='big' disabled>
            <div className={cx('button-content')}>
              <p className='p-reg'>Referred friends</p>
              <p className='p-reg color-ton-coin'>{invitedFriends}</p>
            </div>
          </Button>
        </div>
        <div className={cx('container')}>
          <header>
            <p>{phraseLeaderboard}</p>
          </header>
          <div className={cx('page-stats__leaderboard')}>
            {leaderBord.map(({ place, name, points }) => (
              <div key={place} className={cx('page-stats__leaderboard__item')}>
                <div className={cx('page-stats__leaderboard__item__content')}>
                  <p className={cx('page-stats__leaderboard__number', 'font-w-semibold')}>{place}</p>
                  <p className={cx('page-stats__leaderboard__name', 'p-reg')}>{name}</p>
                </div>
                <p className={cx('page-stats__leaderboard__item__total', 'p-reg')}>{formatNumber(points)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
