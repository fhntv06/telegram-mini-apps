import classNames from 'classnames/bind'
import { useChangeGameMode, useGetPhrases } from '../../../../hooks'
import {
  Button, getStorage, isDemoMode, isOnChainMode, maxCountTransactionForShowModalSwitchMode, setStorage
} from '../../../../shared'

import styles from './SwitchModeModalContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

export const SwitchModeModalContent = ({ closeModalHandler }: IProps) => {
  const changeGameMode = useChangeGameMode()
  const {
    confirm, testMode, realMode, nowYouWillHave, greatYouveTried, letSGo,
  } = useGetPhrases([
    'confirm', 'realMode', 'testMode', 'beforeStartingTheGame',
    'nowYouWillHave', 'greatYouveTried', 'letSGo'
  ])

  // demo or real
  // пользователь не отыграл в demo режиме 5 игр
  const isTestMode = Number(getStorage('count')) < maxCountTransactionForShowModalSwitchMode

  const confirmGameModeHandler = () => {
    changeGameMode(isTestMode ? isDemoMode : isOnChainMode)
    closeModalHandler()

    if (isTestMode && !getStorage('visibleTestModeModalSelectGameMode')) {
      setStorage('visibleTestModeModalSelectGameMode', '1')
    }
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('modal__wrapper')}>
        <p className={cx('title', 'h1')}>{isTestMode ? testMode : realMode}</p>
        <p className={cx('description', 'p-reg')}>{isTestMode ? nowYouWillHave : greatYouveTried}</p>
        <Button
          className={cx('button', 'button__confirm', 'p font-w-semibold')}
          onClick={confirmGameModeHandler}
          type='blue'
        >
          {isTestMode ? confirm : letSGo}
        </Button>
      </div>
    </div>
  )
}
