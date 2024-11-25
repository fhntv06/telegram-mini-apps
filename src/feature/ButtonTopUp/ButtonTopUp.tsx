import { useContext } from 'react'
import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/ui/Icon/types'
import { useGetPhrases } from '../../hooks'
import { ModalContextTypes } from '../../app/providers/ModalProvider/types'
import { ModalContext } from '../../app/contexts'
import { Button } from '../../shared'

import styles from './ButtonTopUp.module.scss'

const cx = classNames.bind(styles)

interface Props {
	iconRightName?: IconNames,
	sizeIcons?: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonTopUp = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
  // @ts-ignore
  const { topUpYourWallet } = useGetPhrases(['topUpYourWallet'])
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

	const handlerConnectWallet = async () => {
		if (onClick) onClick()
		openHandlerModal('wallet')
	}

  return (
		<Button
			className={cx('button', 'p', className)}
			iconLeftName="plus"
			iconRightName={iconRightName}
			sizeIcons={sizeIcons}
			type='gray'
			onClick={handlerConnectWallet}
		>
			{topUpYourWallet}
		</Button>
	)
}
