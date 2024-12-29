import { ReactNode } from 'react'

export interface IOnboardingStats {
  handlerSkip: () => void
  className?:string
}

export interface IScreen {
  index: number
  children: ReactNode
}
