import React from 'react'
import { AnimatePresence, useWillChange, motion } from 'framer-motion'

interface IProps {
  isOpen: boolean
  style?: object
  children: React.ReactNode
  initial?: object | boolean
  animate?: object
  exit?: object
  transition?: object
  className?: string
}

export const AnimationWrapper = ({
  isOpen,
  style,
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { delay: .1, duration: .3, ease: 'easeIn' },
  className
}: IProps) => {
  const willChange = useWillChange()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          style={{ ...style, willChange }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
