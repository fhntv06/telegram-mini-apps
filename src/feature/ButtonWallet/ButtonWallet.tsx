import { useSelector } from 'react-redux'
import { Button, isDemoMode } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'
import { getCorrectBalance } from '../../shared'

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
  const { balance } = useSelector((state: any) => state.userDataWallet)
	const { gameMode } = useSelector((state: any) => state.modeSettings)

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
