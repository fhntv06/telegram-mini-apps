import { IGameStatus } from '../app/providers/types.ts';


export const countPointsChart = 100
export const initialDataGameStatus: IGameStatus = {
  upPoolData: {
		playersImg: [],
		betPool: 0
	},
	downPoolData: {
		playersImg: [],
		betPool: 0
	},
	totalBets : 0,
	btcPrice: 0,
	startBtcPrice: 0,
	gamePhase: 0,
	phaseTimeUntil: 0,
	gameResult: 0,
	last3GamesRes: [],
	livePlayers: 0,
	allTimeWins: 0,
	winPercent: {
		downPercent : 0,
		upPercent : 0
	}
};
export const initialDataPriseHistory: number[] = []
export const arBets = [0.5, 1, 2, 5, 10]
