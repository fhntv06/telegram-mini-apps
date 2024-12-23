import { useTonConnectUI } from '@tonconnect/ui-react'
import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/types'
import { useGetPhrases, useUserData, useDispatch, useSelector } from '../../hooks'
import { setUserDataTelegram, setUserDataWallet} from '../../app/store/slices'
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
	const dispatch = useDispatch()
	const userDataWallet = useSelector((state) => state.userDataWallet)
	const userDataTelegram = useUserData()

  const { connectWallet } = useGetPhrases(['connectWallet'])

	const handlerConnectWallet = () => {
		tonConnectUI.openModal()
			.then(() => {
				if (onClick) {
					onClick()
				}

				dispatch(setUserDataWallet({
					...userDataWallet,
					isConnected: true,
				}))
				if (userDataTelegram) dispatch(setUserDataTelegram(userDataTelegram))
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
