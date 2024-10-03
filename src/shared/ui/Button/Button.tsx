import clns from "classnames/bind";

import styles from './Button.module.scss';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
	disabled?: boolean,
	onClick?: () => void,
	active ? : boolean
}

const cx = clns.bind(styles);

export const Button = ({
	disabled,
	onClick,
	active = false,
	children
}: IProps) => {
	return (
		<button
			onClick={onClick}
			className={
				cx(
					{ 
						active
					}
				)
			}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
