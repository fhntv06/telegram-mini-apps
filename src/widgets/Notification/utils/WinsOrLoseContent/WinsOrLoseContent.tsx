import { useEffect } from 'react'
import classNames from 'classnames/bind'
import { useTonAddress } from '@tonconnect/ui-react'
import { getWalletBet } from '../../../../app/api/user'

import styles from './WinsOrLoseContent.module.scss'
import {formatNumber} from "../../../../shared/utils";

const cx = classNames.bind(styles)

interface IProps {
  type: string
}

export const WinsOrLoseContent = ({ type }: IProps) => {
  let address = useTonAddress()

  console.log('address ', address)

  const isWins = type === 'wins'

  const tons = getWalletBet(address)
    .then((res) => res)
    .catch((error) => console.error(error))

  address = 'RTYG...F6vT'

  useEffect(() => {
      console.log('tons getWalletBet: ', tons)
  }, [tons]);



  return (
    <div className={cx('wrapper', type)}>
      <div className={cx('container', type)}>
        <h2>Wallet</h2>
        <p>{address}</p>
      </div>
      <div className={cx('container', 'right', type)}>
        <h2 className={cx(type)}>{isWins ? 'received' : 'spent'}</h2>
        <p className={cx(type)}>{isWins ? '+' : '-'} {formatNumber(2000)} TON</p>
      </div>
    </div>
  )
}