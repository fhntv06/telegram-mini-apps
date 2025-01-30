import classNames from 'classnames/bind'
import { Counter } from '../../../../shared'
import { useGetPhrases } from '../../../../hooks'

import styles from './WinsOrLoseContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  type: string
  data: {
    tons: number,
    points?: number
  }
}

export const WinsOrLoseContent = ({ type, data: { tons, points = 10 } }: IProps) => {
  const isWins = type === 'wins'

  const { pointsForWinning } = useGetPhrases(['pointsForWinning'])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('container__text')}>
          <h2>Stars</h2>
        </div>
        <div className={cx('container__text', 'right-text', type)}>
          <h2 className={cx(type)}>{isWins ? 'received' : 'spent'}</h2>
          <p className={cx(type)}>{isWins ? '+' : '-'} {tons} Stars</p>
        </div>
      </div>
      {
        (isWins && points > 0) && (
          <div className={cx('container')}>
            <h2 className='h2-big font-w-bold'>{pointsForWinning}</h2>
            <Counter to={points} className='h1 color-ton-coin font-w-bold' prefix='+' animation />
          </div>
        )
      }
    </div>
  )
}
