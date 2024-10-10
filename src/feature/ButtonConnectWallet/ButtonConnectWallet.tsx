import { useTonConnectUI } from '@tonconnect/ui-react';
import classNames from 'classnames/bind'
import { Button } from '../../shared'

import styles from './ButtonConnectWallet.module.scss'

import {IconNames, IconType} from '../../shared/ui/Icon/types'

const cx = classNames.bind(styles)

interface Props {
	iconRightName?: IconNames,
	sizeIcons?: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonConnectWallet = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
	const [tonConnectUI] = useTonConnectUI()

	const handlerConnectWallet = async () => {
		if (onClick) onClick()
		tonConnectUI.openModal()
	}

  return (
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
	)
}