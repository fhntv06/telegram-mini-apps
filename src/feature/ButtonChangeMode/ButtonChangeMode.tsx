import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/ui/Icon/types'
import {
	useChangeGameMode,
	// useGetPhrases
} from '../../hooks'
import { Button } from '../../shared'

import styles from './ButtonChangeMode.module.scss'

const cx = classNames.bind(styles)

interface Props {
	iconRightName?: IconNames,
	sizeIcons?: IconType,
	className?: string,
	onClick?: () => void
}

export const ButtonChangeMode = ({
	sizeIcons,
	iconRightName,
	className,
	onClick,
}: Props) => {
  // @ts-ignore
	// TODO: в будущем будет фраза
  // const { goToRealMode } = useGetPhrases(['goToRealMode'])
	const changeGameMode = useChangeGameMode()

	const handlerChangeGameMode = () => {
		if (onClick) onClick()
		changeGameMode()
	}

  return (
		<Button
			className={cx('button', 'p', className)}
			iconLeftName="plus"
			iconRightName={iconRightName}
			sizeIcons={sizeIcons}
			type='gray'
			onClick={handlerChangeGameMode}
		>
			{/*{goToRealMode}*/}
			Go to real mode
		</Button>
	)
}
