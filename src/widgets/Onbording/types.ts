import { Dispatch, SetStateAction } from "react";

export interface IOnbording {
  handlerSkip:  Dispatch<SetStateAction<boolean>>
  className?:string
}

export interface IScreen {
  index: number
  children: React.ReactNode
}