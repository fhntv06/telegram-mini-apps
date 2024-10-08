import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonConnectWallet.module.scss'

const cx = classNames.bind(styles)

interface Props {
	onClick: () => void
}

export const ButtonConnectWallet = ({
	onClick,
}: Props) => {
  const handlerConnectWallet = async () => {
		onClick()
  }

  return (
		<Button
			className={cx('button', 'p')}
			type='gray'
			iconLeftName="wallet"
			sizeIcons='big'
			onClick={handlerConnectWallet}
		>
			Connect wallet
		</Button>
	)
}