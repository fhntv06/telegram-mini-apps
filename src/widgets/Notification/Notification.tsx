import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames/bind'

import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  type: 'warning' | 'wins' | 'lose' | 'refund'
  isOpen: boolean,
  children: React.ReactNode
}

const initial = { opacity: 0, translateY: '-100%', translateX: '-50%' }
const animate = { opacity: 1, translateY: '0', translateX: '-50%' }

export const Notification = ({
  isOpen = false,
  type,
  children
}: IProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cx('wrapper', type)}
          initial={initial}
          animate={animate}
          exit={initial}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}