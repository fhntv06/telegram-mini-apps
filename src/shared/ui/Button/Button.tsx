import { PropsWithChildren } from 'react';
import classnames from "classnames/bind";
import { IconType, IconNames } from '../Icon/types';
import { ButtonTypes } from './types';
import { Icon } from '../';

import styles from './Button.module.scss';

interface IProps extends PropsWithChildren {
	sizeIcons?: IconType,
	sizeLeftIcon?: IconType,
	sizeRightIcon?: IconType,
	className?: string,
	type?: ButtonTypes
	iconLeftName?: IconNames,
	iconRightName?: IconNames
	disabled?: boolean,
	onClick?: () => void,
	active ? : boolean
}

const cx = classnames.bind(styles);

export const Button = ({
	sizeIcons = 'medium',
	sizeLeftIcon = 'medium',
	sizeRightIcon = 'medium',
	className,
	type = 'gray' as ButtonTypes,
	iconLeftName,
	iconRightName,
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
			{iconLeftName && <Icon className={cx('icon__left')} name={iconLeftName} size={sizeLeftIcon || sizeIcons} />}
			{children}
			{iconRightName && <Icon className={cx('icon__rigth')} name={iconRightName} size={sizeRightIcon || sizeIcons} />}
		</button>
	)
}
