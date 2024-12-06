import classNames from 'classnames/bind'
import { useGetPhrases } from '../../../../hooks'
import { ButtonSwitchMode } from '../../../../feature'

import styles from './SwitchModeModalContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  closeModalHandler: () => void
}

export const SwitchModeModalContent = ({ closeModalHandler }: IProps) => {
  const { weSeeThatYou, youDoingWell } = useGetPhrases(['weSeeThatYou', 'youDoingWell'])

  return (
    <div className={cx('modal__wrapper')}>
      <p className={cx('title', 'h1')}>{youDoingWell}</p>
      <p className={cx('description', 'p-reg')}>{weSeeThatYou}</p>
      <ButtonSwitchMode className={cx('button__confirm')} onClick={closeModalHandler} sizeIcons='big' />
    </div>
  )
}
