import { INotification } from './types'
import { motion, AnimatePresence, useWillChange } from 'framer-motion'
import { useSelector } from '../../hooks'
import classNames from 'classnames/bind'

import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

export const Notification = ({
  isOpen = false,
  type,
  children
}: INotification) => {
  const willChange = useWillChange()
  const { settings: { isFullscreen } } = useSelector((state) => state.settings)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cx('wrapper', type, { 'isFullscreen': isFullscreen })}
          initial={{ opacity: 0, translateY: '-100%', translateX: '-50%' }}
          animate={{ opacity: 1, translateY: '0', translateX: '-50%' }}
          exit={{ opacity: 0, translateY: '-100%', translateX: '-50%' }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          style={{ willChange }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
