import { useEffect } from 'react'
import classNames from 'classnames/bind'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { ICounter } from './types'
import { getCorrectBalanceWithFormatNumber } from '../../utils'

import styles from './Counter.module.scss'

const cx = classNames.bind(styles)

export const Counter = ({
  value,
  direction = 'up',
  prefix = '',
  fixedNumber = 1,
  animation = false,
  className
}: ICounter) => {
  const count = useMotionValue(direction === 'up' ? 0 : value)
  const rounded = useTransform(count, latest => getCorrectBalanceWithFormatNumber(latest, fixedNumber))

  useEffect(() => {
    const controls = animate(
      count,
      direction === 'up' ? value : 0,
      { duration: 3 }
    )

    return () => controls.stop()
  }, [value, direction, count])

  return (
    <div className={cx('counter', { 'animation': animation })}>
      {prefix && <h1 className={className}>{prefix}</h1>}
      <motion.h1 className={className}>{rounded}</motion.h1>
    </div>
  )
}
