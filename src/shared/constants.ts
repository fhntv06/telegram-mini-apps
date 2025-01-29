import { IGameStatus } from '../app/providers/types'
import {ILang, typeOnChainMode, typeDemoMode, typeStarsGame} from './types'
export const urlSocket = `${import.meta.env.VITE_SOCKET_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`
export const minBet = 50
export const minWithdraw = 500
export const countPointsChart = 25
export const numberLastPoint = countPointsChart - 1
export const initialDataPriceHistory: number[] = ((min = 61900, max = 62100) => {
	const array: number[] = [];
	for (let i = 0; i < countPointsChart; i++) {
		array.push((Math.random() * (max - min + 1)) + min)
		// array.push(min + i * 450);
	}
	return array
})()
export const initialDataGameStatus: IGameStatus = {
  upPoolData: {
		bets: [
			{
				img: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: true
			},
		],
		betPool: 25 * 10**9
	},
	downPoolData: {
		bets: [
			{
				img: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: false
			},
			{
				img: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: false
			},
			{
				img: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/images/avatars/user_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`,
				isPending: true
			},
		],
		betPool: 15 * 10**9
	},
	totalBets: 50 * 10**9,
	btcPrice: (Math.floor(Math.random() * (62100 - 62000 + 1))) + 62000,
	startBtcPrice: 62000,
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
export const arBets: number[] = [50, 100, 200, 500, 1000]

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
	players: string
	last3rounds: string
	lastGames: string
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
	gameWithRealTONCoins: string
	demoMode: string
	learningWithNonRealCoins: string
	selectGameMode: string
	gameMode: string
	start: string
	prev: string
	next: string
	skip: string
	begin: string
	alias: string
	notEnoughDemoBalance: string
	yourAnOutOfTime: string
	topUpYourStars: string
	startGame: string
	beforeStartingTheGame: string
	switchToRealMode: string
	youDoingWell: string
	weSeeThatYou: string
	TopUpByCardCIS: string
	TopUpByCard: string
	kotleta: string
	oneMoment: string
	altinBit: string
	bitObmen: string
	paybis: string
	balance: string
	multiplier: string
	pointsForWinning: string
	pulsePoints: string
	points: string,
	placeInLeaderboard: string
	leaderboard: string
	tasks: string
	game: string
	menu: string
	completeTasks: string
	earnMorePoints: string
	pulseMarket: string
	partners: string
	noAvailableTasks: string
	connectYourTON: string
	theRoundHasAlready: string
	daysInTheGame: string
	multiplierToday: string
	logInToTheGame: string
	totalBets: string
	daysInARow: string
	yourMultiplier: string
	continue: string
	inviteFriends: string
	invitedFriends: string
	instruction: string
	testMode: string
	realMode: string
	nowYouWillHave: string
	greatYouveTried: string
	letSGo: string
	inviteYourFriends: string
	visitGameEveryDay: string
	subscribeToOurChannel: string
	enterTheDepositAmount: string
	withDraw: string
	theMinimumNumberOfStars: string
}
export interface ILanguage {
	'english': ILangPhrase
	'spanish': ILangPhrase
	'chinese': ILangPhrase
	'russian': ILangPhrase
}
export const arLanguagesPhraseSite: ILanguage = {
	english: {
		gameInProcess: [
			'Waiting Bets',
			'Accepting Bets',
			'Consolidating bets',
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
		topUp: 'Top up',
		disconnect: 'Disconnect',
		affiliate: 'Affiliate',
		technicalSupport: 'Technical Support',
		connectWallet: 'Connect Wallet',
		english: 'English',
		spanish: 'Spanish',
		chinese: 'Chinese',
		russian: 'Russian',
		livePlayers: 'live players',
		players: 'players',
		last3rounds: 'last 3 rounds',
		lastGames: 'last games',
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
			'Predict the value of crypto assets and earn on it',
			'To get started connect your TON wallet',
			'Choose the size of the investment and decide how the value of the asset will change GO UP or GO DOWN',
			'At the end the round, the winners will get their earning directly to the same digital wallet they signed the trade with',
			'If you don\'t have enough money to participate, click on the “+” at the top of the screen and choose a convenient method of replenishment',
			'You can change the mode by pressing the button in the upper left corner of the screen and selecting the desired parameters',
			'Now select a game mode, and start predicting. You can change your choice at any time in the menu'
		],
		gameWithRealTONCoins: 'game with real ton coins',
		demoMode: 'demo mode',
		learningWithNonRealCoins: 'learning with non real coins',
		selectGameMode: 'Select game mode',
		gameMode: 'game mode',
		start: 'Start',
		prev: 'Prev',
		next: 'Next',
		skip: 'Skip',
		begin: 'Begin',
		alias: 'en',
		notEnoughDemoBalance: 'Not enough demo balance',
		yourAnOutOfTime: 'You did not have enough time to bid in this round, please wait for the next round',
		topUpYourStars: 'Top up your stars',
		startGame: 'Start game',
		beforeStartingTheGame: 'Before starting the game, select the mode. You can change your selection in the assets menu',
		switchToRealMode: 'Switch to Real mode',
		youDoingWell: "You're doing well",
		weSeeThatYou: 'We see that you are already good at predicting the values of cryptocurrencies. Maybe you want to try your hand in Real mode?',
		TopUpByCardCIS: 'Top up by card (CIS)',
		TopUpByCard: 'Top up by card',
		kotleta: 'Kotleta',
		oneMoment: 'OneMoment',
		altinBit: 'AltinBit',
		bitObmen: 'BitObmen',
		paybis: 'Paybis',
		balance: 'Balance',
		multiplier: 'Multiplier',
		pointsForWinning: 'Points for winning',
		pulsePoints: 'Pulse Points',
		points: 'Points',
		placeInLeaderboard: 'th place in the leaderboard',
		leaderboard: 'Leaderboard',
		tasks: 'tasks',
		game: 'game',
		menu: 'menu',
		completeTasks: 'Complete tasks',
		earnMorePoints: 'earn more points',
		pulseMarket: 'Pulse Market',
		partners: 'Partners',
		noAvailableTasks: 'No available tasks',
		connectYourTON: 'Connect your TON wallet to place a bet',
		theRoundHasAlready: 'The round has already started, wait for a new round',
		daysInTheGame: 'days in the game in a row',
		multiplierToday: 'multiplier today',
		logInToTheGame: 'Log in to the game every day and make your',
		totalBets: 'Total bets',
		daysInARow: 'Days in a row',
		yourMultiplier: 'Your multiplier will be even higher tomorrow. But if you miss it, all progress will be reset to zero',
		continue: 'Continue',
		inviteFriends: 'Invite friends',
		invitedFriends: 'Invited friends',
		instruction: 'Instruction',
		testMode: 'Test mode',
		realMode: 'Real mode',
		nowYouWillHave: 'Now you will have a test game so that you can familiarize yourself with the game',
		greatYouveTried: "Great, you've tried to make test lets - try it on real mode now",
		letSGo: 'Let’s go',
		inviteYourFriends: 'Invite your friends',
		visitGameEveryDay: 'Visit game every day',
		subscribeToOurChannel: 'Subscribe to our channel',
		enterTheDepositAmount: 'Enter the deposit amount',
		withDraw: 'Withdraw',
		theMinimumNumberOfStars: 'The minimum number of stars for output is 500',
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
		gameMode: 'Modo de juego',
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
		players: 'jugadores',
		last3rounds: 'últimas 3 rondas',
		lastGames: 'últimos juegos',
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
		gameWithRealTONCoins: 'juego con monedas de toneladas reales',
		demoMode: 'modo de demostración',
		learningWithNonRealCoins: 'aprender con monedas no reales',
		selectGameMode: 'Seleccionar modo de juego',
		start: 'Inicio',
		prev: 'Anterior',
		next: 'Siguiente',
		skip: 'Saltar',
		begin: 'comenzar',
		alias: 'es',
		notEnoughDemoBalance: 'No hay suficiente saldo de demostración',
		yourAnOutOfTime: 'Te quedaste sin tiempo para apostar en esta ronda, espera a la próxima ronda',
		topUpYourStars: 'Recarga tu billetera',
		startGame: 'Iniciar juego',
		beforeStartingTheGame: 'Antes de comenzar el juego, selecciona el modo. Puede cambiar su selección en el menú activos',
		switchToRealMode: 'Cambiar al modo real',
		youDoingWell: 'Lo estás haciendo bien',
		weSeeThatYou: 'Vemos que ya eres bueno prediciendo los valores de las criptomonedas. ¿Quizás quieras probar suerte en modo real?',
		TopUpByCardCIS: 'Recarga con tarjeta (CIS)',
		TopUpByCard: 'Recarga con tarjeta',
		kotleta: 'Kotleta',
		oneMoment: 'OneMoment',
		altinBit: 'AltinBit',
		bitObmen: 'BitObmen',
		paybis: 'Paybis',
		balance: 'Saldo',
		multiplier: 'Multiplicador',
		pointsForWinning: 'Puntos por ganar',
		pulsePoints: 'Puntos de pulso',
		points: 'Puntos',
		placeInLeaderboard: 'lugar en la tabla de clasificación',
		leaderboard: 'Tabla de clasificación',
		tasks: 'tareas',
		game: 'juego',
		menu: 'menú',
		completeTasks: 'Complete tasks',
		earnMorePoints: 'gane más puntos',
		pulseMarket: 'Pulse Market',
		partners: 'Socios',
		noAvailableTasks: 'No hay tareas disponibles',
		connectYourTON: 'Conecte su billetera TON para hacer una apuesta',
		theRoundHasAlready: 'La ronda ya ha comenzado, espere una nueva ronda',
		daysInTheGame: 'días seguidos en el juego',
		multiplierToday: 'multiplicador hoy',
		logInToTheGame: 'Inicia sesión en el juego todos los días y aumenta tu multiplicador',
		totalBets: 'Apuestas totales',
		daysInARow: 'Días seguidos',
		yourMultiplier: 'Tu multiplicador será aún mayor mañana. Pero si te lo pierdes, todo el progreso se restablecerá a cero',
		continue: 'Continuar',
		inviteFriends: 'Invitar amigos',
		invitedFriends: 'Amigos invitados',
		instruction: 'Instrucción',
		testMode: 'Modo de prueba',
		realMode: 'Modo real',
		nowYouWillHave: 'Ahora tendrás un juego de prueba para que puedas familiarizarte con el juego',
		greatYouveTried: "Genial, has intentado hacer una prueba, pruébalo en modo real ahora",
		letSGo: 'Vamos',
		inviteYourFriends: 'Invita a tus amigos',
		visitGameEveryDay: 'Visita el juego todos los días',
		subscribeToOurChannel: 'Suscríbete a nuestro canal',
		enterTheDepositAmount: 'Ingrese el monto del depósito',
		withDraw: 'Retirar',
		theMinimumNumberOfStars: 'El número mínimo de estrellas para la salida es de 500',
	},
	chinese: {
		gameInProcess: [
			'等待投注',
			'接受投注',
			'合并赌注',
			'进行中',
			'资产分配',
		],
		upWins: '胜出',
		downWins: '胜利',
		selectMode: '选择模式',
		gameMode: '游戏模式',
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
		players: '球员',
		last3rounds: '最后三轮',
		lastGames: '最后一场比赛',
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
			'如果您没有足够的资金参与，请点击屏幕顶部的'+'标志，并选择方便的补货方式',
			'您可以通过按下屏幕左上角的按钮并选择所需的参数来更改模式',
			'现在选择游戏模式并开始预测。您可以随时在菜单中更改您的选择'
		],
		gameWithRealTONCoins: '使用真吨硬币的游戏',
		demoMode: '演示模式',
		learningWithNonRealCoins: '用非真实硬币学习',
		selectGameMode: '选择游戏模式',
		start: '开始',
		prev: '上一篇',
		next: '下一个',
		skip: '跳过',
		begin: '開始啦。',
		alias: 'zh',
		notEnoughDemoBalance:'没有足够的演示平衡',
		yourAnOutOfTime: '你在这轮投注的时间已经用完了，请等待下一轮',
		topUpYourStars: '把你的钱包装满',
		startGame: '开始游戏',
		beforeStartingTheGame: '在开始游戏之前，选择模式。 您可以在资产菜单中更改选择',
		switchToRealMode: '切换到真实模式',
		youDoingWell: '你做得很好',
		weSeeThatYou: '我们看到你已经擅长预测加密货币的价值。 也许你想试试你的手在真实模式？',
		TopUpByCardCIS: '按卡充值(CIS)',
		TopUpByCard: '按卡充值',
		kotleta: 'Kotleta',
		oneMoment: 'OneMoment',
		altinBit: 'AltinBit',
		bitObmen: 'BitObmen',
		paybis: 'Paybis',
		balance: '平衡表',
		multiplier: '乘数',
		pointsForWinning: '获胜积分',
		pulsePoints: '脉冲点',
		points: '积分',
		placeInLeaderboard: '在排行榜上的位置',
		leaderboard: '排行榜',
		tasks: '任务',
		game: '游戏',
		menu: '菜单',
		completeTasks: '完成任务',
		earnMorePoints: '赚取更多积分',
		pulseMarket: 'Pulse Market',
		partners: '合作伙伴',
		noAvailableTasks: '没有可用的任务',
		connectYourTON: '连接你的吨钱包下注',
		theRoundHasAlready: '回合已经开始，等待新一轮',
		daysInTheGame: '连续几天在比赛中',
		multiplierToday: '今天乘数',
		logInToTheGame: '每天登录游戏，让你的乘数变大',
		totalBets: '总赌注',
		daysInARow: '连续几天',
		yourMultiplier: '明天你的乘数会更高。 但是，如果你错过了它，所有的进展将被重置为零',
		continue: '继续',
		inviteFriends: '邀请朋友',
		invitedFriends: '邀请朋友',
		instruction: '教育指引',
		testMode: '测试模式',
		realMode: '真实模式',
		nowYouWillHave: '现在你将有一个测试游戏，这样你就可以熟悉游戏',
		greatYouveTried: "很好，你已经试过测试了--现在就在真实模式上试试吧",
		letSGo: '我们走吧',
		inviteYourFriends: '邀请你的朋友',
		visitGameEveryDay: '每天访问游戏',
		subscribeToOurChannel: '订阅我们的频道',
		enterTheDepositAmount: '输入存款金额',
		withDraw: '撤回',
		theMinimumNumberOfStars: '输出的最小星星数为500',

	},
	russian: {
		gameInProcess: [
			'Ожидание ставок',
			'Прием ставок',
			'Консолидация ставок',
			'Раунд продолжается',
			'Распределение активов',
		],
		upWins: 'Верхний пул',
		downWins: 'Нижний пул',
		selectMode: 'Выберите режим',
		gameMode: 'Режимы игры',
		assets: 'Активы',
		confirm: 'Подтвердить',
		topUpToContinue: 'Полполнение баланса:',
		yourWallet: 'ваш кошелек',
		copied: 'скопировано',
		P2PMarket: 'Р2Р Рынок',
		centralisedExchange: 'Централизованная биржа',
		topUp: 'Пополнить',
		disconnect: 'Отключить',
		affiliate: 'Партнерская программа',
		technicalSupport: 'Техническая поддержка',
		connectWallet: 'Подключите кошелек',
		english: 'Английский',
		spanish: 'Испанский',
		chinese: 'Китайский',
		russian: 'Русский',
		livePlayers: 'Онлайн игроки',
		players: 'Игроки',
		last3rounds: 'Последние 3 раунда',
		lastGames: 'Последние игры',
		allTimeWins: 'Выйграно за все время',
		goUp: 'Вверх',
		goDown: 'Вниз',
		up: 'Вверхний пул',
		down: 'Нижний пул',
		winners: 'Выиграл',
		losers: 'Проиграл',
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
		gameWithRealTONCoins: 'игра с реальными тоннами монет',
		demoMode: 'деморежим',
		learningWithNonRealCoins: 'обучение с ненастоящими монетами',
		selectGameMode: 'Выбрать режим игры',
		start: 'Вперед',
		prev: 'Предыдущий',
		next: 'Следующий',
		skip: 'Пропустить',
		begin: 'Начать',
		alias: 'ru',
		notEnoughDemoBalance: 'Недостаточно демо-баланса',
		yourAnOutOfTime: 'У вас не хватило времени сделать ставку в этом раунде, пожалуйста, дождитесь следующего раунда',
		topUpYourStars: 'Пополните Stars',
		startGame: 'Начать игру',
		beforeStartingTheGame: 'Перед началом игры выберите режим. Вы можете изменить свой выбор в меню "Ресурсы".',
		switchToRealMode: 'Переключиться в реальный режим',
		youDoingWell: 'Отлично получается',
		weSeeThatYou: 'Мы видим, что вы уже хорошо умеете предсказывать стоимость криптовалют. Может быть, вы хотите попробовать свои силы в реальном режиме?',
		TopUpByCardCIS: 'Пополнение счета с помощью карты (СНГ)',
		TopUpByCard: 'Пополнение счета с помощью карты',
		kotleta: 'Kotleta',
		oneMoment: 'OneMoment',
		altinBit: 'AltinBit',
		bitObmen: 'BitObmen',
		paybis: 'Paybis',
		balance: 'Баланс',
		multiplier: 'Множитель',
		pointsForWinning: 'Очки за выигрыша',
		points: 'Очки',
		pulsePoints: 'Точки пульса',
		placeInLeaderboard: 'место в списке лидеров',
		leaderboard: 'Таблица лидеров',
		tasks: 'Задания',
		game: 'Игра',
		menu: 'Меню',
		completeTasks: 'Выполняйте задания',
		earnMorePoints: 'зарабатывайте больше очков',
		pulseMarket: 'Pulse Market',
		partners: 'Партнеры',
		noAvailableTasks: 'Нет доступных задач',
		connectYourTON: 'Подключите свой кошелек TON, чтобы сделать ставку',
		theRoundHasAlready: 'Раунд уже начался, ждите нового раунда',
		daysInTheGame: 'заходили дней подряд',
		multiplierToday: 'ваш множитель сегодня',
		logInToTheGame: 'Заходите в игру каждый день и увеличивайте свой множитель',
		totalBets: 'Общая сумма ставок',
		daysInARow: 'Дни подряд',
		yourMultiplier: 'Завтра ваш множитель будет еще больше. Но если вы не зайдете, прогресс будет потерян',
		continue: 'Продолжить',
		inviteFriends: 'Пригласить друзей',
		invitedFriends: 'Приглашено друзей',
		instruction: 'Инструкция',
		testMode: 'Тестовый режим',
		realMode: 'Реальный режим',
		nowYouWillHave: 'Теперь у вас будет тестовая игра, чтобы вы могли ознакомиться с игрой',
		greatYouveTried: "Отлично, вы попробовали сделать тест, давайте попробуем это на практике\". режим сейчас",
		letSGo: 'Поехали',
		inviteYourFriends: 'Приглашайте своих друзей',
		visitGameEveryDay: 'Посещайте игру каждый день',
		subscribeToOurChannel: 'Подписывайтесь на наш канал',
		enterTheDepositAmount: 'Введите сумму пополнения',
		withDraw: 'Вывести',
		theMinimumNumberOfStars: 'Минимальное количество выводимых звезд - 500'
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
export const isOnChainMode: typeOnChainMode = 'ON_CHAIN'
export const isDemoMode: typeDemoMode = 'DEMO'
export const isStarsMode: typeStarsGame = 'STARS_GAME'

// sources
export const sourcePulseReferralBot: string = 'https://t.me/PulseReferralBot'
export const sourcePulseGameSupport: string = 'https://t.me/pulse_game_support'
export const sourceCryptoBot: string = 'https://t.me/CryptoBot'
export const sourceWallet: string = 'https://t.me/wallet'
export const sourceKotleta: string = 'https://kotleta.gg'
export const sourceOnemoment: string = 'http://onemoment.cc/'
export const sourceAltinbit: string = 'http://altinbit.com/'
export const sourceBitobmen: string = 'http://bitobmen.net/'
export const sourcePaybis: string = 'https://t.me/paybis_crypto_exchange_bot'

export const maxCountTransactionForShowModalSwitchMode = 5
export const msInDay = 1000 * 60 * 60 * 24 // ms * s * m * h
