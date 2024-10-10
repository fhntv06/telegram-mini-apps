import { Button } from '../../shared'
import classNames from 'classnames/bind'
import styles from './ButtonConnectWallet.module.scss'
import {IconNames, IconType} from '../../shared/ui/Icon/types'

const cx = classNames.bind(styles)

interface Props {
	iconRightName: IconNames,
	sizeIcons: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonConnectWallet = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
	const handlerConnectWallet = async () => {
		if (onClick) onClick()
	}

  return (
		<>
			{/*<TonConnectButton className={cx('button', 'p')} />*/}
			<Button
				className={cx('button', 'p', className)}
				iconLeftName="wallet"
				iconRightName={iconRightName}
				sizeIcons={sizeIcons}
				type='gray'
				onClick={handlerConnectWallet}
			>
				Connect wallet
			</Button>
		</>
	)
}