import classNames from 'classnames/bind'
import { Icon } from '../../../../shared'
import styles from './WarningNotificationContent.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  text?: string
  closeHandler: () => void
}

export const WarningNotificationContent = ({ text = '', closeHandler }: IProps) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Icon className={cx('container__icon-left')} name='warning' size='big' />
        <p>{text}</p>
      </div>
      <span onClick={closeHandler} ><Icon name='cross' size='big' /></span>
    </div>
  )
}