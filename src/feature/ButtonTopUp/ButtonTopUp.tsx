import classNames from 'classnames/bind'
import { IconNames, IconType } from '../../shared/types'
import { useGetPhrases } from '../../hooks'
import { Button } from '../../shared'

import styles from './ButtonTopUp.module.scss'
import { NavLink } from "react-router-dom";
import { pathsRoutes } from "../../app/routes";

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
  const { topUpYourWallet } = useGetPhrases(['topUpYourWallet'])

	const handlerConnectWallet = () => {
		if (onClick) onClick()
	}

  return (
	  <NavLink className={cx('button', className)} to={pathsRoutes.wallet}>
			<Button
				className='p font-w-semibold'
				iconLeftName='plus'
				iconRightName={iconRightName}
				sizeIcons={sizeIcons}
				type='blue'
				onClick={handlerConnectWallet}
			>
				{topUpYourWallet}
			</Button>
		</NavLink>
	)
}
