import { IRounds } from '../../shared/types'
import { IDataPanel } from '../types'

export interface IMainFooter extends IDataPanel {
  dataUp: IDataPanel
  dataDown: IDataPanel,
  rounds: IRounds[]
}