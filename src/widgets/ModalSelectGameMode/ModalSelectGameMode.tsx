import { useWillChange } from 'framer-motion'
import classNames from 'classnames/bind'

import { useGetPhrases, useChangeGameMode } from '../../hooks'
import {
	isOnChainMode, isDemoMode, Button, AnimationWrapper
} from '../../shared'
import { IModalSelectGameMode } from './types'

import styles from './ModalSelectGameMode.module.scss'

const cx = classNames.bind(styles)

const propsAnimation = {
	initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    delay: .1,
    duration: .3,
    ease: 'easeInOut',
  }
}

export const ModalSelectGameMode = ({
  isOpen = false,
  className = '',
  closeHandler,
	initialGameMode
}: IModalSelectGameMode) => {
	const changeGameMode = useChangeGameMode()
	const willChange = useWillChange()
	const {
		confirm, testMode, realMode, nowYouWillHave, greatYouveTried, letSGo,
	} = useGetPhrases([
		'confirm', 'realMode', 'testMode', 'beforeStartingTheGame',
		'nowYouWillHave', 'greatYouveTried', 'letSGo'
	])

	const confirmGameModeHandler = () => {
		changeGameMode(initialGameMode === isDemoMode ? isDemoMode : isOnChainMode)
		closeHandler()
	}

	return (
		// TODO: вынести это в отдельный компонент обертку
		<AnimationWrapper
			isOpen={isOpen}
			style={{willChange}}
			className={cx('blur')}
			{...propsAnimation}
		>
			<div className={cx('modal')}>
				<div className={cx('modal__wrapper', className)}>
					<p className={cx('title', 'h1')}>{initialGameMode === isDemoMode ? testMode : realMode}</p>
					<p className={cx('description', 'p-reg')}>{initialGameMode === isDemoMode ? nowYouWillHave : greatYouveTried}</p>
					<Button
						className={cx('button', 'button__confirm', 'p font-w-semibold')}
						onClick={confirmGameModeHandler}
						type='blue'
					>
						{initialGameMode === isDemoMode ? confirm : letSGo}
					</Button>
				</div>
			</div>
		</AnimationWrapper>
	)
}
