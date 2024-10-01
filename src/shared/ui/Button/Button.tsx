import clns from "classnames/bind";

import styles from './Button.module.scss';
import { PropsWithChildren, useState } from 'react';

interface IProps extends PropsWithChildren {
	active ? : boolean
}

const cx = clns.bind(styles);

export const Button = ({
	active = false,
	children
}: IProps) => {
	const [click, setClick] = useState<boolean>(false);

	const handlerClick = () => {
		setClick((prev:boolean) => !prev);
	}

	return (
		<button
			onClick={handlerClick}
			className={
				cx(
					{ 
						'click': click,
						active
					}
				)
			}
		>
			{children}
		</button>
	)
}
