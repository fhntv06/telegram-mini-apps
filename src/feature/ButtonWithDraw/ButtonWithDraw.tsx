import { useContext } from 'react'
import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/types'
import { useGetPhrases } from '../../hooks'
import { Button } from '../../shared'

import { ModalContextTypes } from '../../app/providers/ModalProvider/types'
import {ModalContext, NotificationContext} from '../../app/contexts'

import styles from './ButtonWithDraw.module.scss'
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {INotificationContextTypes} from "../../app/providers/NotificationProvider/types.ts";

const cx = classNames.bind(styles)

interface Props {
	iconRightName?: IconNames,
	sizeIcons?: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonWithDraw = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
	const { withDraw } = useGetPhrases(['withDraw'])
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)
	const wallet = useTonWallet()
	const [tonConnectUI] = useTonConnectUI()
	const { openHandler: openHandlerNotification } = useContext<INotificationContextTypes>(NotificationContext)
	const { connectYourTON } = useGetPhrases(['connectYourTON'])

	const withDrawHandler = () => {
		if (onClick) onClick()

		if (!wallet) {
			tonConnectUI.openModal()
				.then(() => openHandlerNotification('warning', { text: connectYourTON }))
		} else {
			openHandlerModal('withDraw')
		}
	}

  return (
		<Button
			className={cx('button', 'p font-w-semibold', className)}
			type='blue'
			sizeIcons={sizeIcons}
			iconRightName={iconRightName}
			onClick={withDrawHandler}
		>
			{withDraw} (minimum 500)
		</Button>
	)
}
