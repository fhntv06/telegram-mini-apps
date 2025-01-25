import { useContext } from 'react'
import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/types'
import { useGetPhrases } from '../../hooks'
import { Button } from '../../shared'

import { ModalContextTypes } from '../../app/providers/ModalProvider/types'
import { ModalContext } from '../../app/contexts'

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
  const { topUpYourStars } = useGetPhrases(['topUpYourStars'])
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

	const handlerConnectWallet = () => {
		if (onClick) onClick()
		openHandlerModal('topUpStars')
		// открывать модалку для пополнения старс
	}

  return (
		<Button
			className={cx('button', 'p font-w-semibold', className)}
			iconLeftName='plus'
			iconRightName={iconRightName}
			sizeIcons={sizeIcons}
			type='blue'
			onClick={handlerConnectWallet}
		>
			{topUpYourStars}
		</Button>
	)
}
