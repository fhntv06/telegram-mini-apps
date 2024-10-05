import classNames from 'classnames/bind'
import styles from './ChartPanel.module.scss'

const cx = classNames.bind(styles)

export const ChartPanel = () => {
  const upProcent = 123
  const downProcent = 132

  return (
    <div className={cx('panel')}>
      <div className={cx('panel__bet-type')}>
        <h2>UP WINS</h2>
        <p className={cx('panel__bet-procent', 'up')}>{upProcent}%</p>
      </div>
      <div className={cx('panel__bet-type', 'time')}>
        <h2>GAME IN PROCESS</h2>
        <h1>00:16</h1>
      </div>
      <div className={cx('panel__bet-type', 'down')}>
        <h2>DOWN WINS</h2>
        <p className={cx('panel__bet-procent', 'down')}>{downProcent}%</p>
      </div>
    </div>
  )
}