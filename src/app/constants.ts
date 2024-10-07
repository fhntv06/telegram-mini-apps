import { IGameStatus } from './providers/types';

export const initialData: IGameStatus = {
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
	/*
	 *  0 - down
	 *  1 - up
	 *  2 - refund
	 */
	last3GamesRes: [],
	livePlayers: 0,
	allTimeWins: '',
	winPercent: {
		downPercent : 0,
		upPercent : 0,
	}
};