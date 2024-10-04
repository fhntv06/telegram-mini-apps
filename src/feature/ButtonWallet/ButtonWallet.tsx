import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonWallet.module.scss'

const cx = classNames.bind(styles)

interface Props {
    onClick: () => void
}

export const ButtonWallet = ({
    onClick,
}: Props) => {
    const text = '100 000 000';

	return (
		<Button
			className={cx('button', '')}
			type='gray'
			iconLeftName="ton"
			iconRigthName="plus"
			sizeIcons='medium'
			onClick={onClick}
		>
			{text}
		</Button>
	)
}