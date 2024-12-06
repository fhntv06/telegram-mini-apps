import { Dispatch, SetStateAction } from 'react'

export interface IOnboarding {
  handlerSkip: Dispatch<SetStateAction<boolean>>
  className?:string
}

export interface IScreen {
  index: number
  children: React.ReactNode
}
