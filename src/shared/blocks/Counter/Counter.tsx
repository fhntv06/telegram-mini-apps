import { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { useMotionValue, useInView, useSpring, motion } from 'framer-motion'

import { ICounter } from './types'

import styles from './Counter.module.scss'

const cx = classNames.bind(styles)

export function Counter({
  direction = 'up',
  prefix = '',
  fixedNumber = 1,
  animation = false,
  from = 0,
  to = 0,
  className
}: ICounter) {
  const ref = useRef<HTMLHeadingElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from)
  const springValue = useSpring(motionValue, {
    damping: 200,
    stiffness: 350, // примерно длительность в 4 секунды
  })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? from : to)
    }
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Number(latest.toFixed(fixedNumber))
          )
        }
      }),
    [springValue]
  )

  return (
    <div className={cx('counter', {'animation': animation})}>
      {prefix && <h1 className={className}>{prefix}</h1>}
      {(from === 0 && to === 0)
        ? <h1 className={className}>0</h1>
        : <motion.h1
          className={className} ref={ref}
          transition={{
            type: "spring",
            visualDuration: 50,
            bounce: 0.5
          }}
        />
      }
    </div>
  )
}