export interface IModeSettings {
  coin: string
  time: ITimeModeSettings
}

export interface ITimeModeSettings {
  text: string,
  value: number,
  unit: string
}