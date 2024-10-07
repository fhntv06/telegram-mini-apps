import { IRounds } from '../../shared/types'
import { IDataPanel } from '../types'

export interface IMainFooter {
  upPoolData: IDataPanel
  downPoolData: IDataPanel,
  last3GamesRes: IRounds[],
  livePlayers: number,
  allTimeWins: number,
}