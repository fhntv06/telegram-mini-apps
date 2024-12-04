import { createContext } from 'react'
import { IGameStatus } from '../providers/types'
import { initialDataGameStatus } from '../../shared'

export const GameStatusContext = createContext<IGameStatus>(initialDataGameStatus);
