import { useState } from 'react'
import { AnimatePresence, motion, useWillChange } from 'framer-motion'
import classNames from 'classnames/bind'

import { useGetPhrases, useChangeGameMode } from '../../hooks'
import { SelectHorizontal, isOnChainMode, isDemoMode, Button } from '../../shared'
import { typeDemoMode, typeOnChainMode } from '../../shared/types'
import { IModalSelectGameMode } from './types'

import styles from './ModalSelectGameMode.module.scss'

const cx = classNames.bind(styles)

export const ModalSelectGameMode = ({
  isOpen = false,
  className = '',
  closeHandler
}: IModalSelectGameMode) => {
  const [mode, setMode] = useState<typeDemoMode | typeOnChainMode>(isDemoMode)
  const changeGameMode = useChangeGameMode()
  const willChange = useWillChange()

  const {
    confirm, realMode, demoMode, selectGameMode, beforeStartingTheGame
  } = useGetPhrases(['confirm', 'realMode', 'demoMode', 'selectGameMode', 'beforeStartingTheGame'])

  const confirmGameModeHandler = () => {
    changeGameMode(mode)
    closeHandler()
  }

  return (
    // TODO: вынести это в отдельный компонент обертку
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={cx('modal')}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              delay: .1,
              duration: .3,
              ease: 'easeInOut',
            }}
            style={{willChange}}
          >
            <div className={cx('modal__wrapper', className)}>
              <p className={cx('title', 'h1')}>{selectGameMode}</p>
              <p className={cx('description', 'p-reg')}>{beforeStartingTheGame}</p>
              <SelectHorizontal
                changeId={isDemoMode}
                textBtnLeft={realMode}
                textBtnRight={demoMode}
                onClickLeftBtn={() => setMode(isOnChainMode)}
                onClickRightBtn={() => setMode(isDemoMode)}
              />
              <Button
                className={cx('button', 'button__confirm', 'p font-w-semibold')}
                onClick={confirmGameModeHandler}
                type='blue'
              >
                {confirm}
              </Button>
            </div>
          </motion.div>
          <motion.div
            className={cx('blur')}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              delay: .1,
              duration: .3,
              ease: 'easeInOut',
            }}
            style={{willChange}}
          />
        </>
      )}
    </AnimatePresence>
  )
}
