import { Select, Icon } from '../../../../shared'
import classNames from 'classnames/bind'
import styles from './WalletModalContent.module.scss'

interface IProps {
  closeModalHandler: () => void
}

const cx = classNames.bind(styles)

const marketData = [
  {
    text: 'P2P Market',
    icon: 'market',
  },
  {
    text: 'Market 1',
    icon: 'bitcoin',
    onClick: () => alert('Select market 1!'),
  },
  {
    text: 'Market 2',
    icon: 'bitcoin',
    onClick: () => alert('Select market 2!'),
  }
]
const exchangeData = [
  {
    text: 'Centralised exchange',
    icon: 'exchange',
    onClick: () => alert('30 seconds'),
  },
]

export const WalletModalContent = ({ closeModalHandler }: IProps) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header>
          <p>TOP UP TO CONTINUE</p>
          <span onClick={closeModalHandler}><Icon name='cross' size='big' /></span>
        </header>
        <Select data={marketData} typeStyle='light' />
      </div>
      <div className={cx('container')}>
        <Select data={exchangeData} typeStyle='light' />
      </div>
    </div>
  )
}