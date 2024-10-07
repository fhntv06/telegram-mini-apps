import { useContext } from 'react'
import classNames from 'classnames/bind'
import { GameStatusContext } from '../../app/contexts'
import { differenceInSeconds } from '../../shared/utils'

import styles from './ChartPanel.module.scss'

const cx = classNames.bind(styles)

export const ChartPanel = () => {
  const {
    phaseTimeUntil,
    winPercent: { downPercent, upPercent }
  } = useContext(GameStatusContext);

  return (
    <div className={cx('panel')}>
      <div className={cx('panel__bet-type')}>
        <h2>UP WINS</h2>
        <p className={cx('panel__bet-percent', 'up')}>{upPercent}%</p>
      </div>
      <div className={cx('panel__bet-type', 'time')}>
        <h2>GAME IN PROCESS</h2>
        <h1>{differenceInSeconds(phaseTimeUntil)}</h1>
      </div>
      <div className={cx('panel__bet-type', 'down')}>
        <h2>DOWN WINS</h2>
        <p className={cx('panel__bet-percent', 'down')}>{downPercent}%</p>
      </div>
    </div>
  )
}