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
		playersImg: [
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
		],
		betPool: 25 * 10**9
	},
	downPoolData: {
		playersImg: [
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
		],
		betPool: 15 * 10**9
	},
	totalBets: 50 * 10**9,
	btcPrice: (Math.floor(Math.random() * (62001 - 62000 + 1))) + 62000,
	startBtcPrice: (Math.floor(Math.random() * (62001 - 62000 + 1))) + 62000,
	gamePhase: 0,
	phaseTimeUntil: Date.now() + 30 * 1000,
	gameResult: 0,
	last3GamesRes: [Math.floor(Math.random() * (2 - 1 + 1)) + 1, Math.floor(Math.random() * (2 - 1 + 1)) + 1, Math.floor(Math.random() * (2 - 1 + 1)) + 1],
	livePlayers: Math.floor(Math.random() * (2000 - 1 + 1)) + 1,
	allTimeWins: Math.floor(Math.random() * (1000000 * 10**9 - 1 * 10**9 + 1 * 10**9)) + 1 * 10**9,
	winPercent: {
		downPercent : 200,
		upPercent : 200
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