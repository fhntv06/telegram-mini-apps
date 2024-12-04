import { useSelector } from 'react-redux'
import { Button } from '../../shared'
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

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName="ton-medium"
			iconRightName="plus-medium"
			sizeIcons='medium'
			onClick={onClick}
		>
			{getCorrectBalance(balance)}
		</Button>
	)
}
