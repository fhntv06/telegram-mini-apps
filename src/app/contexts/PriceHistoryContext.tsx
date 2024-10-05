import { createContext } from 'react'
import { initialData } from '../constants'
import { IPriceInfo } from '../providers/types';

export const PriceHistoryContext = createContext<IPriceInfo[]>([initialData.PriceInfo]);
