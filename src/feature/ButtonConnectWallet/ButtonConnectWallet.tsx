import { useTonConnectUI } from '@tonconnect/ui-react';
import classNames from 'classnames/bind'
import { Button } from '../../shared'
import { IconNames, IconType } from '../../shared/ui/Icon/types'
import { useGetPhrases } from '../../hooks'

import styles from './ButtonConnectWallet.module.scss'

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

  // @ts-ignore
  const { connectWallet } = useGetPhrases(['connectWallet'])

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
			{connectWallet}
		</Button>
	)
}