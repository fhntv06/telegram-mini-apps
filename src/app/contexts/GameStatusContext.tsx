import { createContext } from 'react'
import { IGameStatus } from '../providers/types'
import { initialDataGameStatus } from '../constants'

export const GameStatusContext = createContext<IGameStatus>(initialDataGameStatus);
