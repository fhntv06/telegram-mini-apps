import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonChangeMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
    onClick: () => void
}

export const ButtonChangeMode = ({
    onClick,
}: Props) => {
    const text = "$BTC, 30s";

	return (
		<Button
			className={cx('button')}
			type='gray'
			iconLeftName="bitcoin"
			iconRigthName="arrows-cyrcle"
			sizeIcons='medium'
			onClick={onClick}
		>
			{text}
		</Button>
	)
}