import { IGameStatus } from '../app/providers/types.ts';


export const countPointsChart = 100
export const initialDataGameStatus: IGameStatus = {
  upPoolData: {
		playersImg: [
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
		],
		betPool: 10000000000
	},
	downPoolData: {
		playersImg: [
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
			'https://steamuserimages-a.akamaihd.net/ugc/2432579570947109735/1FEECA503896F729624FD0C364A47FE2F3EACA57/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
			'https://yt3.googleusercontent.com/C3TOxGJhmHe2hhfaiKh7hJJZkEzbYDjCk7mIlXVcW1Aq6GWbko7wfmeWLFa9BqZSgtVgJ4bI6yw=s900-c-k-c0x00ffffff-no-rj',
		],
		betPool: 12000000000
	},
	totalBets : 1010,
	btcPrice: 56000,
	startBtcPrice: 55000,
	gamePhase: 0,
	phaseTimeUntil: Date.now() + 45,
	gameResult: 0,
	last3GamesRes: [1,2,0],
	livePlayers: 10000,
	allTimeWins: '1000000',
	winPercent: {
		downPercent : 132,
		upPercent : 123,
	}
};
export const initialDataPriseHistory: number[] = ((min = 62000, max = 65000) => {
	const array: number[] = [];

	for (let i = 0; i < countPointsChart; i++) {
		array.push(Math.floor(Math.random() * (max - min + 1)) + min);
	}

	return array;
})();
export const arBets = [0.5, 1, 2, 5, 10]
