import React from 'react'
import { motion, useWillChange } from 'framer-motion'
import classNames from 'classnames/bind'

import styles from './Modal.module.scss'

import { IModalTypes } from './types'
import { AnimationWrapper } from '../../shared'

const cx = classNames.bind(styles)

interface IProps {
  isOpen: boolean,
  typeModal: IModalTypes,
  closeHandler: () => void,
  children: React.ReactNode
}

export const Modal = ({
  isOpen = false,
  closeHandler,
  children
}: IProps) => {
  const willChange = useWillChange()

  return (
    <AnimationWrapper
      isOpen={isOpen}
      style={{willChange}}
      className={cx('blur')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: .1,
        duration: .3,
        ease: 'easeInOut'
      }}
    >
      {children}
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
        onClick={closeHandler}
      />
    </AnimationWrapper>
  )
}
