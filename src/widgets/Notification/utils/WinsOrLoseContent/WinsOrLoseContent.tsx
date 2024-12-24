import classNames from 'classnames/bind'
import { useTonAddress } from '@tonconnect/ui-react'
import { Counter, formatIntTonNumber } from '../../../../shared'

import styles from './WinsOrLoseContent.module.scss'
import { useGetPhrases } from "../../../../hooks";

const cx = classNames.bind(styles)

interface IProps {
  type: string
  data: {
    tons: number,
    points?: number
  }
}

export const WinsOrLoseContent = ({ type, data: { tons, points = 10 } }: IProps) => {
  const address = useTonAddress()
  const isWins = type === 'wins'

  const { pointsForWinning } = useGetPhrases(['pointsForWinning'])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('container__text')}>
          <h2>Wallet</h2>
          <p>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</p>
        </div>
        <div className={cx('container__text', 'right-text', type)}>
          <h2 className={cx(type)}>{isWins ? 'received' : 'spent'}</h2>
          <p className={cx(type)}>{isWins ? '+' : '-'} {formatIntTonNumber(tons)} TON</p>
        </div>
      </div>
      {
        isWins && (
          <div className={cx('container')}>
            <h2 className='h2-big font-w-bold'>{pointsForWinning}</h2>
            <Counter value={points} className='h1 color-ton-coin font-w-bold' prefix='+' fixedNumber={1} />
          </div>
        )
      }
    </div>
  )
}
