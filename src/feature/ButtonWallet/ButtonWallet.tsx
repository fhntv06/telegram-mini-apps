import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'
import { useSelector } from '../../hooks'
import { getCorrectBalance, Button, isDemoMode } from '../../shared'

const cx = classNames.bind(styles)

interface Props {
	isActive?: boolean
	onClick?: () => void,
	className?: string,
}

export const ButtonWallet = ({
	onClick,
	className
}: Props) => {
  const { balance } = useSelector((state) => state.userDataWallet)
	const { gameMode } = useSelector((state) => state.modeSettings)

	const buttonWalletHandler = () => {
		if (gameMode !== isDemoMode && onClick) {
			onClick()
		}
	}

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName='ton-medium'
			iconRightName={gameMode !== isDemoMode ? 'plus-medium' : ''}
			sizeIcons='medium'
			onClick={buttonWalletHandler}
		>
			{getCorrectBalance(balance)}
		</Button>
	)
}
