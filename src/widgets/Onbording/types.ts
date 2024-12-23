import { Dispatch, SetStateAction, ReactNode } from 'react'

export interface IOnboarding {
  handlerSkip: Dispatch<SetStateAction<boolean>>
  className?:string
}

export interface IScreen {
  index: number
  children: ReactNode
}
