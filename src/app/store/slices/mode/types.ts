import { typeDemoMode, typeOnChainMode } from '../../../../shared/types'

export interface IModeSettings {
  coin: string
  time: ITimeModeSettings
  ticker: 'BTC-30'
  gameMode: typeOnChainMode | typeDemoMode
}

export interface ITimeModeSettings {
  text: string,
  value: number,
  unit: string
}
