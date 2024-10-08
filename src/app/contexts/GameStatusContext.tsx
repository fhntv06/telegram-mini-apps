import { createContext } from 'react'
import { IGameStatus } from '../providers/types'
import { initialDataGameStatus } from '../../shared/constants.ts'

export const GameStatusContext = createContext<IGameStatus>(initialDataGameStatus);
