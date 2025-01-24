import { typeDemoMode, typeOnChainMode, typeStarsGame } from '../../../../shared/types'

export interface IModeSettings {
  coin: string
  time: ITimeModeSettings
  ticker: 'BTC-30'
  gameMode: typeOnChainMode | typeDemoMode | typeStarsGame
}

export interface ITimeModeSettings {
  text: string,
  value: number,
  unit: string
}
