export interface ICounter {
  value: number
  fixedNumber?: number
  direction?: 'up' | 'down'
  prefix?: string
  className?: string
}

export interface INumbers {
  from: number
  to: number
}
