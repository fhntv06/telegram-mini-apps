import React, { PropsWithChildren } from 'react';
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
	onClick?: ((event: React.MouseEvent<HTMLElement>) => void)
	active ? : boolean,
	href?: string
}

const cx = classnames.bind(styles);

export const Button = ({
	sizeIcons,
	sizeLeftIcon = 'medium',
	sizeRightIcon = 'medium',
	className,
	type = 'gray' as ButtonTypes,
	iconLeftName,
	iconRightName,
	disabled,
	onClick,
	href = '',
	children
}: IProps) => {
	const content = (
		<>
			{iconLeftName && <Icon className={cx('icon__left')} name={iconLeftName} size={sizeIcons || sizeLeftIcon}/>}
			{children && <span>{children}</span>}
			{iconRightName && <Icon className={cx('icon__rigth')} name={iconRightName} size={sizeIcons || sizeRightIcon}/>}
		</>
	)
	return (
		href
			? (
				<a
					href={href}
				 	className={
						 cx(
							 className,
							 type
						 )
					 }
				>
					{content}
				</a>
			) : (
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
					{content}
				</button>
			)
	)
}
