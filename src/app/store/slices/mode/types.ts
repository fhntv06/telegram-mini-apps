export interface IModeSettings {
  coin: string
  time: ITimeModeSettings
  ticker: 'BTC-30'
  gameMode: 'ON_CHAIN' | 'DEMO'
}

export interface ITimeModeSettings {
  text: string,
  value: number,
  unit: string
}