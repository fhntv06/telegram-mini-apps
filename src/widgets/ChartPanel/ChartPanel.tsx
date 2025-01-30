import { motion } from 'framer-motion'
import classNames from 'classnames/bind'
import { useGetPhrases, useSelector } from '../../hooks'
import { differenceInSeconds, Icon } from '../../shared'

import styles from './ChartPanel.module.scss'

const cx = classNames.bind(styles)

export const ChartPanel = () => {
  const { gamePhase, phaseTimeUntil, allTimeWins: allTimeWinsCount } = useSelector((state) => state.gameStatus)
  const textMode = '$BTC,\u00A030s'
  const { settings: { isFullscreen } } = useSelector((state) => state.settings)
  const { gameMode, allTimeWins, gameInProcess } = useGetPhrases(['gameMode', 'allTimeWins', 'gameInProcess'])

  return (
    <div className={cx('panel', { 'isFullscreen': isFullscreen })}>
      <div className={cx('panel__bet-type')}>
        <h2>{gameMode}</h2>
        <p className='p-medium'>
          <Icon name='bitcoin-medium'/>
          {textMode}
        </p>
      </div>
      <div className={cx('panel__bet-type', 'time')}>
        <motion.h2
          initial={{opacity: 1}}
          animate={(gamePhase === 2 || gamePhase === 4) ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
          transition={(gamePhase === 2 || gamePhase === 4) ? { duration: 1, repeat: Infinity } : {}}
        >
          {gameInProcess[gamePhase]}
        </motion.h2>
        {(gamePhase !== 2 && gamePhase !== 4) && <h1>{differenceInSeconds(phaseTimeUntil)}</h1>}
      </div>
      <div className={cx('panel__bet-type')}>
        <h2 className='right-text'>{allTimeWins}</h2>
        <p className='p-medium'>
          <Icon name='stars-1-medium' />
          {allTimeWinsCount}
        </p>
      </div>
    </div>
  )
}
