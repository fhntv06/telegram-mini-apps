import {PropsWithChildren, useEffect, useState} from 'react';
import classnames from "classnames/bind";
import { motion } from 'framer-motion'
import styles from './SelectHorizontal.module.scss';

interface IProps extends PropsWithChildren {
	textBtnLeft: string,
	textDescrBtnLeft?: string,
	textBtnRight: string,
	textDescrBtnRight?: string,
	onClickLeftBtn: () => void,
	onClickRightBtn: () => void
}

const cx = classnames.bind(styles);

const animation = {
	initial: { translateX: 0 },
	animate: { translateX: '100%' }
}

export const SelectHorizontal = ({
	textBtnLeft,
	textDescrBtnLeft = '',
	textDescrBtnRight = '',
	textBtnRight = '',
	onClickLeftBtn,
	onClickRightBtn
}: IProps) => {
	const [chosen, setChosen] = useState(false)
	const [totalDisabled, setTotalDisabled] = useState(false)

	const handlerLeftBtn = () => {
		onClickLeftBtn()
		setChosen(false)
		setTotalDisabled(true)
	}
	const handlerRightBtn = () => {
		onClickRightBtn()
		setChosen(true)
		setTotalDisabled(true)
	}

	useEffect(() => {
		const timer = setTimeout(() => setTotalDisabled(false), 2000)

		return () => clearTimeout(timer)
	}, [totalDisabled])

	return (
		<div className={cx('select-horizontal')}>
			<div className={cx('select-horizontal__buttons')}>
				<motion.div
					initial={animation.initial}
					animate={chosen ? animation.animate : animation.initial}
					exit={animation.initial}
					transition={{
						delay: .1,
						duration: .3,
						ease: 'easeInOut',
					}}
					className={cx('select-horizontal__changes')}
				/>
				<button className={cx('select-horizontal__button')} onClick={handlerLeftBtn} disabled={!chosen}>
					{textBtnLeft}
				</button>
				<button className={cx('select-horizontal__button')} onClick={handlerRightBtn} disabled={chosen}>
					{textBtnRight}
				</button>
			</div>
			{
				(!textDescrBtnLeft && !textDescrBtnRight) && (
					<div className={cx('select-horizontal__descriptions')}>
						{!textDescrBtnLeft && (<h2 className={cx({'active': !chosen})}>{textDescrBtnLeft}</h2>)}
						{!textDescrBtnRight && (<h2 className={cx({'active': chosen})}>{textDescrBtnRight}</h2>)}
					</div>
				)
			}
		</div>
	)
}
