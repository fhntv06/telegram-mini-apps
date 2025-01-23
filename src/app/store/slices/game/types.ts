export interface ILeaderboard {
	place: number,
	name: string,
	points: number
}

export interface ILeaderboards {
	leaderBord: ILeaderboard[]
}

export interface IConditions {
	conditions?: {
		externalLink?: string
	},
}

export interface ITask extends IConditions{
	id: number
	title: string
	image: string
	multiplier?: number
	coinsReward?: number
	playerStatus?: 0 | 1 | 2
}

export interface ITasks {
	tasks: ITask[]
	hints: ITask[]
	partners: ITask[]
}
