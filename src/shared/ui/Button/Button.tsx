import { PropsWithChildren } from 'react';
import classnames from "classnames/bind";
import { IconType, IconNames } from '../Icon/types';
import { ButtonTypes } from './types';
import { Icon } from '../';

import styles from './Button.module.scss';

interface IProps extends PropsWithChildren {
	sizeIcons?: IconType
	className?: string,
	type?: ButtonTypes
	iconLeftName?: IconNames,
	iconRigthName?: IconNames
	disabled?: boolean,
	onClick?: () => void,
	active ? : boolean
}

const cx = classnames.bind(styles);

export const Button = ({
	sizeIcons,
	className,
	type = 'gray' as ButtonTypes,
	iconLeftName,
	iconRigthName,
	disabled,
	onClick,
	children
}: IProps) => {
	return (
		<button
			onClick={onClick}
			className={
				cx(
					className,
					type
				)
			}
			disabled={disabled}
		>
			{iconLeftName && <Icon name={iconLeftName} size={sizeIcons} />}
			{children}
			{iconRigthName && <Icon name={iconRigthName} size={sizeIcons} />}
		</button>
	)
}
