import { useTonConnectUI } from '@tonconnect/ui-react';
import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/types'
import { useGetPhrases, usePostReferral } from '../../hooks'
import { Button } from '../../shared'

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
	const { handlerPostReferral } = usePostReferral()

  const { connectWallet } = useGetPhrases(['connectWallet'])

	const handlerConnectWallet = () => {
		tonConnectUI.connectWallet()
			.then((res) => {
				console.log('connectedWallet ', res)
				if (onClick) onClick()
				console.log('handlerPostReferral connecting to wallet')
				handlerPostReferral()
			})
			.catch(error => console.error("Error connecting to wallet:", error))
	}

  return (
		<Button
			className={cx('button', 'p font-w-semibold', className)}
			iconLeftName="wallet"
			iconRightName={iconRightName}
			sizeIcons={sizeIcons}
			type='blue'
			onClick={handlerConnectWallet}
		>
			{connectWallet}
		</Button>
	)
}
