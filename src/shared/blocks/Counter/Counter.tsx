import { useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { ICounter } from './types'
import { getCorrectBalanceWithFormatNumber } from '../../utils'

export const Counter = ({ value, direction = 'up', className }: ICounter) => {
  const count = useMotionValue(direction === 'up' ? 0 : value)
  const rounded = useTransform(count, latest => getCorrectBalanceWithFormatNumber(latest))

  useEffect(() => {
    const controls = animate(
      count,
      direction === 'up' ? value : 0,
      { duration: 3 }
    )

    return () => controls.stop()
  }, [value, direction, count])

  return <motion.p className={className}>{rounded}</motion.p>
}
