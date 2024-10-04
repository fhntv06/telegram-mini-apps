import { IRounds } from '../../shared/types'
import { IDataPanel } from '../types'

export interface IMainFooter {
  dataUp: IDataPanel
  dataDown: IDataPanel,
  rounds: IRounds[],
  livePlayers: number,
  allTimeWins: number,
}