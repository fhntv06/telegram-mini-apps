import { useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { ICounter } from './types'
import { getCorrectBalanceWithFormatNumber } from '../../utils'

export const Counter = ({ value, direction = 'up', prefix = '', className }: ICounter) => {
  const count = useMotionValue(direction === 'up' ? 0 : value)
  const rounded = useTransform(count, latest => getCorrectBalanceWithFormatNumber(latest, 0))

  useEffect(() => {
    const controls = animate(
      count,
      direction === 'up' ? value : 0,
      { duration: 3 }
    )

    return () => controls.stop()
  }, [value, direction, count])

  return (
    <div>
      {prefix && <h1 className={className}>{prefix}</h1>}
      <motion.h1 className={className}>{rounded}</motion.h1>
    </div>
  )
}
