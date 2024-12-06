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
	active? : boolean,
	href?: string
}

const cx = classnames.bind(styles);

export const Button = ({
	active = false,
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
			{iconLeftName && <Icon className={cx('icon__left')} name={iconLeftName} size={sizeIcons || sizeLeftIcon} />}
			{(children && iconLeftName && iconRightName) ? <span>{children}</span> : children}
			{iconRightName && <Icon className={cx('icon__right')} name={iconRightName} size={sizeIcons || sizeRightIcon} />}
		</>
	)
	const classNames = cx(className, type, { active: active })
	return (
		href
			? <a href={href} className={classNames}>{content}</a>
			: <button className={classNames} disabled={disabled} onClick={onClick}>{content}</button>
	)
}
