import { PropsWithChildren, useState } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames/bind'
import { motion } from 'framer-motion'
import styles from './SelectHorizontal.module.scss'

interface IProps extends PropsWithChildren {
	changeId: string,
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
	changeId = '',
	textBtnLeft,
	textDescrBtnLeft = '',
	textDescrBtnRight = '',
	textBtnRight = '',
	onClickLeftBtn,
	onClickRightBtn
}: IProps) => {
	const { gameMode } = useSelector((state: any)=> state.modeSettings)
	const [chosen, setChosen] = useState(changeId === gameMode)

	const handlerLeftBtn = () => {
		onClickLeftBtn()
		setChosen(false)
	}
	const handlerRightBtn = () => {
		onClickRightBtn()
		setChosen(true)
	}

	return (
		<div className={cx('select-horizontal')}>
			<div className={cx('select-horizontal__buttons')}>
				<motion.div
					initial={false}
					animate={chosen ? animation.animate : animation.initial}
					transition={{
						delay: .1,
						duration: .3,
						ease: 'easeInOut',
					}}
					className={cx('select-horizontal__changes')}
				/>
				<button className={cx('select-horizontal__button', 'font-w-semibold')} onClick={handlerLeftBtn} disabled={!chosen}>
					{textBtnLeft}
				</button>
				<button className={cx('select-horizontal__button', 'font-w-semibold')} onClick={handlerRightBtn} disabled={chosen}>
					{textBtnRight}
				</button>
			</div>
			{
				(textDescrBtnLeft && textDescrBtnRight) && (
					<div className={cx('select-horizontal__descriptions')}>
						<h2 className={cx({'active': !chosen})}>{textDescrBtnLeft}</h2>
						<h2 className={cx({'active': chosen})}>{textDescrBtnRight}</h2>
					</div>
				)
			}
		</div>
	)
}
