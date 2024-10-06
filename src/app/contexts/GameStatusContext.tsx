import { createContext } from 'react'
import { IGameStatus } from '../providers/types'
import { initialData } from '../constants'

export const GameStatusContext = createContext<IGameStatus>(initialData);
