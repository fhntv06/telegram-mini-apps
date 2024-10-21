import {useEffect, useRef, useState} from 'react'
import { animate } from 'framer-motion'
import { ICounter, INumbers } from './types'
import { getCorrectBalanceWithFormatNumber } from '../../utils'

export const Counter = ({ value, direction = 'up', className }: ICounter) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const [numbers] = useState<INumbers>({
    from: direction === 'up' ? 0 : value,
    to: direction === 'up' ? value : 0
  })

  useEffect(() => {
    const controls = animate(numbers.from, numbers.to, {
      duration: 3,
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = (value || value === 0) ? getCorrectBalanceWithFormatNumber(value) : null;
        }
      },
    });

    return () => controls.stop();
  }, []);

  return <p className={className} ref={ref} />
}