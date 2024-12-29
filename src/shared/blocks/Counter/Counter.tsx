import { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { useMotionValue, useInView, useSpring } from 'framer-motion'

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
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
      {(from === 0 && to === 0) ? <h1 className={className}>0</h1> : <h1 className={className} ref={ref} />}
    </div>
  )
}