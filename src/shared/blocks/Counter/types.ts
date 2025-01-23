export interface ICounter {
  fixedNumber?: number
  direction?: 'up' | 'down'
  prefix?: string
  className?: string
  animation?: boolean
  from?: number
  to: number
}
