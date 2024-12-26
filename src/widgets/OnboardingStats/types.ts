import { Dispatch, SetStateAction, ReactNode } from 'react'

export interface IOnboardingStats {
  handlerSkip: Dispatch<SetStateAction<boolean>>
  className?:string
}

export interface IScreen {
  index: number
  children: ReactNode
}
