import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBurger.module.scss'

const cx = classNames.bind(styles)

interface Props {
	isOpen: boolean,
	onClick: () => void,
	className?: string
}

export const ButtonBurger = ({
	isOpen = false,
	onClick,
	className,
}: Props) => {

	return (
		<Button
			className={cx('button', className)}
			type='gray'
			iconLeftName={isOpen ? 'cross' : 'burger'}
			onClick={onClick}
		></Button>
	)
}