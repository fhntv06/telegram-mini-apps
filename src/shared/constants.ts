import { IGameStatus } from '../app/providers/types.ts';
import { ILang } from '../app/store/slices/types'
export const urlSocket = `${import.meta.env.VITE_SOCKET_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`
export const gameSocket = new WebSocket(urlSocket)
export const countPointsChart = 25
export const numberLastPoint = countPointsChart - 1
export const initialDataPriceHistory: number[] = ((min = 61900, max = 62100) => {
	const array: number[] = [];
	for (let i = 0; i < countPointsChart; i++) {
		array.push((Math.random() * (max - min + 1)) + min);
		// array.push(min + i * 450);
	}
	return array;
})();
export const initialDataGameStatus: IGameStatus = {
  upPoolData: {
		bets: [
			{
				img: `/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: true
			},
		],
		betPool: 25 * 10**9
	},
	downPoolData: {
		bets: [
			{
				img: `/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: false
			},
			{
				img: `/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: false
			},
			{
				img: `/telegram-mini-apps/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: true
			},
		],
		betPool: 15 * 10**9
	},
	totalBets: 50 * 10**9,
	btcPrice: (Math.floor(Math.random() * (62100 - 62000 + 1))) + 62000,
	startBtcPrice: 62000,
	gamePhase: 3,
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
	onboarding: string[]
	realMode: string
	gameWithRealTONCoins: string
	demoMode: string
	learningWithNonRealCoins: string
	selectGameMode: string
	start: string
	prev: string
	next: string
	skip: string
	begin: string
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
		onboarding: [
			'Predict the value of cryptoassets and earn on it',
			'To get started connect your TON wallet',
			'Choose the size of the investment and decide how the value of the asset will change GO UP or GO DOWN',
			'At the end the round, the winners will get their earning directly to the same digatal wallet they signed the trade with',
			'If you don\'t have enough money to participate, click on the “+” at the top of the screen and choose a convenient method of replenishment',
			'You can change the mode by pressing the button in the upper left corner of the screen and selecting the desired parameters',
			'Now select a game mode, and start predicting. You can change your choice at any time in the menu'
		],
		realMode: 'real mode',
		gameWithRealTONCoins: 'game with real ton coins',
		demoMode: 'demo mode',
		learningWithNonRealCoins: 'learning with non real coins',
		selectGameMode: 'Select game mode',
		start: 'Start',
		prev: 'Prev',
		next: 'Next',
		skip: 'Skip',
		begin: 'Begin',
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
		onboarding: [
			'Prediga el valor de los criptoactivos y gane con él',
			'Para comenzar, conecte su billetera TON',
			'Elija el tamaño de la inversión y decida cómo cambiará el valor del activo, SUBA o BAJE',
			'Al final de la ronda, los ganadores recibirán sus ganancias directamente en la misma billetera digatal con la que firmaron el intercambio',
			'Si no tiene suficiente dinero para participar, haga clic en el signo “+” en la parte superior de la pantalla y elija un método conveniente de reposición',
			'Puede cambiar el modo presionando el botón en la esquina superior izquierda de la pantalla y seleccionando los parámetros deseados',
			'Ahora selecciona un modo de juego y comienza a predecir. Puedes cambiar tu elección en cualquier momento en el menú.'
		],
		realMode: 'modo real',
		gameWithRealTONCoins: 'juego con monedas de toneladas reales',
		demoMode: 'modo de demostración',
		learningWithNonRealCoins: 'aprender con monedas no reales',
		selectGameMode: 'Seleccionar modo de juego',
		start: 'Inicio',
		prev: 'Anterior',
		next: 'Siguiente',
		skip: 'Saltar',
		begin: 'comenzar',
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
		onboarding: [
			'预测加密资产的价值并从中获利',
			'要开始，连接你的钱包吨。..',
			'选择投资的规模，并决定资产的价值将如何变化，上升或下降',
			'在本轮结束时，获胜者将直接将他们的奖金存入他们签署交易所的同一个digatal钱包',
			'如果您没有足够的资金参与，请点击屏幕顶部的"+"标志，并选择方便的补货方式',
			'您可以通过按下屏幕左上角的按钮并选择所需的参数来更改模式',
			'现在选择游戏模式并开始预测。您可以随时在菜单中更改您的选择'
		],
		realMode: '实模式',
		gameWithRealTONCoins: '使用真吨硬币的游戏',
		demoMode: '演示模式',
		learningWithNonRealCoins: '用非真实硬币学习',
		selectGameMode: '选择游戏模式',
		start: '开始',
		prev: '上一篇',
		next: '下一个',
		skip: '跳过',
		begin: '開始啦。',
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
		onboarding: [
			'Прогнозируйте стоимость криптоактивов и зарабатывайте на этом',
			'Для начала подключите свой кошелек TON',
			'Выберите размер инвестиций и решите, как изменится стоимость актива - ПОВЫСИТСЯ или ПОНИЗИТСЯ',
			'В конце раунда победители получат свои заработанные средства непосредственно на тот же цифровой кошелек, с помощью которого они заключили сделку',
			'Если у вас недостаточно денег для участия, нажмите на “+” в верхней части экрана и выберите удобный способ пополнения',
			'Вы можете изменить режим, нажав кнопку в левом верхнем углу экрана и выбрав нужные параметры',
			'Теперь выберите режим игры и приступайте к прогнозированию. Вы можете изменить свой выбор в любой момент в меню.'
		],
		realMode: 'реальный режим',
		gameWithRealTONCoins: 'игра с реальными тоннами монет',
		demoMode: 'деморежим',
		learningWithNonRealCoins: 'обучение с ненастоящими монетами',
		selectGameMode: 'Выбрать режим игры',
		start: 'Вперед',
		prev: 'Предыдущий',
		next: 'Следующий',
		skip: 'Пропустить',
		begin: 'Начать',
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
export const initialDataGameMode = {
	ticker: 'BTC-30',
	gameMode: 'ON_CHAIN',
}
export const isDemoMode = 'DEMO'