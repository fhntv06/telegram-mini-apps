import classNames from 'classnames/bind'
import { differenceInSeconds } from '../../shared/utils'

import styles from './ChartPanel.module.scss'
import {useSelector} from "react-redux";
import { useGetPhrases } from '../../hooks'

const cx = classNames.bind(styles)

export const ChartPanel = () => {
  const {
    gamePhase,
    phaseTimeUntil,
    winPercent: { downPercent, upPercent }
  } = useSelector((state: any) => state.gameStatus)

  // @ts-ignore
  const { gameInProcess, upWins } = useGetPhrases(['gameInProcess', 'upWins'])

  return (
    <div className={cx('panel')}>
      <div className={cx('panel__bet-type')}>
        <h2>{upWins}</h2>
        <p className={cx('panel__bet-percent', 'up')}>{upPercent}%</p>
      </div>
      <div className={cx('panel__bet-type', 'time')}>
        <h2>{gameInProcess[gamePhase]}</h2>
        {<h1>{gamePhase !== 2 || gamePhase !== 4 ? 'Please wait' : differenceInSeconds(phaseTimeUntil)}</h1>}
      </div>
      <div className={cx('panel__bet-type', 'down')}>
      <h2>DOWN WINS</h2>
        <p className={cx('panel__bet-percent', 'down')}>{downPercent}%</p>
      </div>
    </div>
  )
}