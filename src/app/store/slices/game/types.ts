export interface ILeaderboard {
	place: number,
	name: string,
	points: number
}

export interface ILeaderboards {
	leaderBord: ILeaderboard[]
}

export interface ITask {
	id: number
	title: string
	image: string
	type: 'partner' | 'hint' | 'default'
	multiplier?: number
	coinsReward?: number
	conditions?: {
		externalLink: string
	},
	playerStatus?: 0 | 1 | 2
}

export interface ITasks {
	tasks: ITask[]
}
