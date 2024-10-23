import { IGameStatus } from '../app/providers/types.ts';
import { ILang } from '../app/store/slices/types'
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
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
		],
		betPool: 25 * 10**9
	},
	downPoolData: {
		playersImg: [
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
			`/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
		],
		betPool: 15 * 10**9
	},
	totalBets: 50 * 10**9,
	btcPrice: (Math.floor(Math.random() * (62001 - 62000 + 1))) + 62000,
	startBtcPrice: (Math.floor(Math.random() * (62001 - 62000 + 1))) + 62000,
	gamePhase: 4,
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

export interface ILangPhrase {
	gameInProcess: string[]
	upWins:	string
	downWins: string
	selectMode:	string
	assets: string
	confirm: string
	topUpToContinue: string
	yourWallet: string
	copied: string
	P2PMarket: string
	centralisedExchange: string
	topUp: string
	disconnect: string
	affiliate: string
	technicalSupport: string
	connectWallet: string
	english: string
	spanish: string
	chinese: string
	russian: string
	livePlayers: string
	last3rounds: string
	allTimeWins: string
	goUp: string
	goDown: string
	up: string
	down: string
	winners: string
	losers: string
	send: string
	wallet: string
	mexc: string
	binance: string
	bybit: string
	'30 Seconds': string
	'5 Minutes': string
	'30 Minutes': string
	commingSoon: string
	alias: string
}
export interface ILanguage {
	english: ILangPhrase
	spanish: ILangPhrase
	chinese: ILangPhrase
	russian: ILangPhrase
}
export const arLanguagesPhraseSite: ILanguage = {
	english: {
		gameInProcess: [
			'Waiting Bets',
			'Accepting Bets',
			'consolidating bets',
			'Round in Progress',
			'Asset Distribution',
		],
		upWins: 'UP WINS',
		downWins: 'DOWN WINS',
		selectMode: 'select mode',
		assets: 'assets',
		confirm: 'Confirm',
		topUpToContinue: 'top up to continue',
		yourWallet: 'your wallet',
		copied: 'copied',
		P2PMarket: 'P2P Market',
		centralisedExchange: 'centralised exchange',
		topUp: 'Top Up',
		disconnect: 'Disconnect',
		affiliate: 'Affiliate',
		technicalSupport: 'Technical Support',
		connectWallet: 'Connect Wallet',
		english: 'English',
		spanish: 'Spanish',
		chinese: 'Chinese',
		russian: 'Russian',
		livePlayers: 'live players',
		last3rounds: 'last 3 rounds',
		allTimeWins: 'all time wins',
		goUp: 'go up',
		goDown: 'go down',
		up: 'up',
		down: 'down',
		winners: 'winners',
		losers: 'losers',
		send: 'send',
		wallet: 'wallet',
		mexc: 'mexc',
		binance: 'binance',
		bybit: 'bybit',
		'30 Seconds': '30 Seconds',
		'5 Minutes': '5 Minutes',
		'30 Minutes': '30 Minutes',
		commingSoon: 'COMMING SOON',
		alias: 'en'
	},
	spanish: {
		gameInProcess: [
			'Apuestas en espera',
			'Aceptar apuestas',
			'consolidar apuestas',
			'Ronda en curso',
			'Distribución de activos',
		],
		upWins: 'arriba Gana',
		downWins: 'abajo gana',
		selectMode: 'seleccionar Modo',
		assets: 'activos',
		confirm: 'Confirmar',
		topUpToContinue: 'recarga Para Continuar',
		yourWallet: 'tu billetera',
		copied: 'copiada',
		P2PMarket: 'Mercado P2P',
		centralisedExchange: 'intercambio centralizado',
		topUp: 'recarga',
		disconnect: 'Desconectar',
		affiliate: 'Afiliado',
		technicalSupport: 'Soporte Técnico',
		connectWallet: 'Conecte la Billetera',
		english: 'Inglés',
		spanish: 'Español',
		chinese: 'Chino',
		russian: 'Ruso',
		livePlayers: 'jugadores en Vivo',
		last3rounds: 'últimas 3 rondas',
		allTimeWins: 'todos los Tiempos Ganan',
		goUp: 'sube',
		goDown: 'bajar',
		up: 'subir',
		down: 'abajo',
		winners: 'ganadores',
		losers: 'perdedores',
		send: 'send',
		wallet: 'wallet',
		mexc: 'mexc',
		binance: 'binance',
		bybit: 'bybit',
		'30 Seconds': '110 Segundos',
		'5 Minutes': '5 Minutos',
		'30 Minutes': '30 Minutos',
		commingSoon: 'MUY PRONTO',
		alias: 'es'
	},
	chinese: {
		gameInProcess: [
			"等待投注",
			"接受投注",
			"合并赌注",
			"进行中",
			"资产分配",
		],
		upWins: '胜出',
		downWins: '胜利',
		selectMode: '选择模式',
		assets: '资产',
		confirm: '确认',
		topUpToContinue: '顶起来继续',
		yourWallet: '你的钱包',
		copied: '复制的',
		P2PMarket: 'P2P市场',
		centralisedExchange: '集中交易所',
		topUp: '补足；补足',
		disconnect: '断开连接',
		affiliate: '附属机构',
		technicalSupport: '技术支持',
		connectWallet: '连接钱包',
		english: '英语',
		spanish: '西班牙语',
		chinese: '中文',
		russian: '俄语',
		livePlayers: '现场玩家',
		last3rounds: '最后三轮',
		allTimeWins: '所有时间都赢',
		goUp: '上去',
		goDown: '下去',
		up: '向上',
		down: '向下',
		winners: '得奖者',
		losers: '失败者',
		send: 'send',
		wallet: 'wallet',
		mexc: 'mexc',
		binance: 'binance',
		bybit: 'bybit',
		'30 Seconds':'110秒',
		'5 Minutes':'5分钟',
		'30 Minutes':'30分钟',
		commingSoon: '即将推出',
		alias: 'zh'
	},
	russian: {
		gameInProcess: [
			'Ожидание ставок',
			"Прием ставок",
			"консолидация ставок",
			"Раунд продолжается",
			"Распределение активов",
		],
		upWins: 'Вверх выигрывает',
		downWins: 'Внизу выигрывает',
		selectMode: 'Выберите режим',
		assets: 'Активы',
		confirm: 'Подтвердить',
		topUpToContinue: 'Верхний вверх для продолжения',
		yourWallet: 'ваш кошелек',
		copied: 'скопировано',
		P2PMarket: 'Р2Р Рынок',
		centralisedExchange: 'Централизованная биржа',
		topUp: 'Верхний вверх',
		disconnect: 'Отключить',
		affiliate: 'Партнер',
		technicalSupport: 'Техническая поддержка',
		connectWallet: 'Подключите кошелек',
		english: 'Английский',
		spanish: 'Испанский',
		chinese: 'Китайский',
		russian: 'Русский',
		livePlayers: 'Играков онлайн',
		last3rounds: 'Последние 3 раунда',
		allTimeWins: 'Выйграно за все время',
		goUp: 'Вверх',
		goDown: 'Вниз',
		up: 'Вверх',
		down: 'Вниз',
		winners: 'Победители',
		losers: 'Проигравшие',
		send: 'Send',
		wallet: 'Wallet',
		mexc: 'mexc',
		binance: 'binance',
		bybit: 'bybit',
		'30 Seconds':'110 Секунд',
		'5 Minutes':'5 Минут',
		'30 Minutes':'30 Минут',
		commingSoon: 'СКОРО',
		alias: 'ru'
	},
}
export const arLanguagesSite: ILang[] = [
	{
		name: 'english',
		icon: 'flag-uk',
		action: 'set-lang',
	},
	{
		name: 'spanish',
		icon: 'flag-spanish',
		action: 'set-lang',
	},
	{
		name: 'chinese',
		icon: 'flag-china',
		action: 'set-lang',
	},
	{
		name: 'russian',
		icon: 'flag-russia',
		action: 'set-lang',
	}
]