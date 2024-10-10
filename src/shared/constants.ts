import { IGameStatus } from '../app/providers/types.ts';

export const countPointsChart = 100
export const numberLastPoint = 89
export const initialDataPriceHistory: number[] = ((min = 62000, max = 62001) => {
	const array: number[] = [];
	for (let i = 0; i < countPointsChart; i++) {
		array.push((Math.random() * (max - min + 1)) + min);
	}
	return array;
})();
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
	},
	// priceHistory: initialDataPriceHistory
}
export const arBets: number[] = [0.5, 1, 2, 5, 10]

export interface ILang {
	gameInProcess: string
	upWins: string
	alias: string
}
export interface ILanguage {
	english: ILang
	france: ILang
	germany: ILang
	russian: ILang
}
export const arLanguagesSite: ILanguage = {
	english: {
		gameInProcess: 'GAME IN PROCESS',
		upWins: 'UP WINS',
		alias: 'en'
	},
	france: {
		gameInProcess: 'JEU EN COURS',
		upWins: 'VICTOIRES EN HAUSSE',
		alias: 'fr'
	},
	germany: {
		gameInProcess: 'SPIEL IN BEARBEITUNG',
		upWins: 'GEWINNE NACH OBEN',
		alias: 'de'
	},
	russian: {
		gameInProcess: 'ИГРА В ПРОЦЕССЕ',
		upWins: 'ВВЕРХ ВЫИГРЫВАЕТ',
		alias: 'ru'
	},
}