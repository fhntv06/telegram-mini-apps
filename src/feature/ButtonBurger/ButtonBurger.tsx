import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonBurger.module.scss'

const cx = classNames.bind(styles)

interface Props {
    onClick: () => void
}

export const ButtonBurger = ({
    onClick,
}: Props) => {

	return (
		<Button
			className={cx('button')}
			type='gray'
			iconLeftName='burger'
			sizeIcons='big'
			onClick={onClick}
		></Button>
	)
}