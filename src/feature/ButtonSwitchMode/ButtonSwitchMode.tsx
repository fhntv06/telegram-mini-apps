import classNames from 'classnames/bind'
import {
	useChangeGameMode,
	useGetPhrases } from '../../hooks'
import { Button, isOnChainMode } from '../../shared'
import { IconNames, IconType } from '../../shared/types'

import styles from './ButtonSwitchMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
	iconRightName?: IconNames,
	sizeIcons?: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonSwitchMode = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
  const { switchToRealMode } = useGetPhrases(['switchToRealMode'])
	const changeGameMode = useChangeGameMode()

	const handlerChangeGameMode = () => {
		if (onClick) onClick()
		changeGameMode(isOnChainMode)
	}

  return (
		<Button
			className={cx('button', 'p font-w-semibold', className)}
			iconLeftName='switch'
			iconRightName={iconRightName}
			sizeIcons={sizeIcons}
			type='blue'
			onClick={handlerChangeGameMode}
		>
			{switchToRealMode}
		</Button>
	)
}
