import { IPerson, IRoundsType} from '../../../shared/types'

export interface IGameStatus {
	upPoolData: {
		bets: IPerson[]
		betPool: number
	},
	downPoolData: {
		bets: IPerson[]
		betPool: number
	},
	totalBets : number,
	btcPrice: number,
	startBtcPrice: number,
	gamePhase: number,
	phaseTimeUntil: number,
	gameResult: number,
	/*
	 *  0 - down
	 *  1 - up
	 *  2 - refund
	 */
	last3GamesRes: IRoundsType[],
	livePlayers: number;
	allTimeWins: number;
	winPercent: {
		downPercent : number,
		upPercent : number,
	},
	priceHistory?: number[]
}

// export interface IGameStatus {
// 	PoolInfo: IRoundPool,
// 	PriceInfo: IPriceInfo,
// 	InternalInfo: IInternalInfo,
// 	JackpotInfo: IJackpotInfo,
// 	NewResult: IResultGame
// 	LastResults: ILastResults
// }
// export interface IRoundPool {
// 	Created: boolean,
// 	StartPrice: number,
// 	EndPrice: number,
// 	MinBetAmount: number,
// 	MaxBetAmount: number,
// 	PoolBetsLimit: number,
// 	UpBetGroup: {
// 		Bets: any[],
// 		Addresses: any[],
// 		Avatars: any[],
// 		Countries: any[],
// 		WhiteLabelIds: any[],
// 		Total: number,
// 		DistributedCount: number,
// 		TotalDistributed: number
// 	},
// 	DownBetGroup: {
// 		Bets: any[],
// 		Addresses: any[],
// 		Avatars: any[],
// 		Countries: any[],
// 		WhiteLabelIds: any[],
// 		Total: number,
// 		DistributedCount: number,
// 		TotalDistributed: number
// 	},
// 	RoundStartTime: number,
// 	TradesStartTimeMS: number,
// 	TradesEndTimeMS: number
// }
// export interface IInternalInfo {
// 	EnableTrade: boolean,
// 	Time2End: number,
// 	Text: EStatusText
// }
// export enum EStatusText {
// 	Open = "TradesAreOpened",
// 	CloseTrades = "TradesAreClosedWaitFinishPrice",
// 	Mining = "WaitingForMining",
// 	Distribution = "TradesAreClosedDistributionTrades",
// }
// export interface IJackpotInfo {
// 	JackpotBalance: number
// }
// export interface IResultGame {
// 	StartPrice: number,
// 	EndPrice: number,
// 	Wins: TSideTeam | null,
// 	Hash: string,
// 	Timestamp: number
// }
// export type TSideTeam = 'UP' | 'DOWN';
// export interface ILastResults {
// 	Data: IResultGame[]
// }