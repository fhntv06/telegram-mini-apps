import React from 'react'
import { AnimatePresence, useWillChange, motion } from 'framer-motion'

interface IProps {
  style: object,
  children: React.ReactNode
  initial?: object | boolean,
  animate?: object,
  exit?: object,
  transition?: object,
}

export const AnimationWrapper = ({
   style,
   children,
   initial = { opacity: 0 },
   animate = { opacity: 1 },
   exit = { opacity: 0 },
   transition = {
     delay: .1,
     duration: .3,
     ease: 'easeIn',
   }
}: IProps) => {
  const willChange = useWillChange()

  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        style={{ ...style, willChange }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
