export * from './ui/types'
export * from './blocks/types'

export type typeOnChainMode = 'ON_CHAIN'
export type typeDemoMode = 'DEMO'

export interface ILang {
	name: 'english' | 'spanish' | 'chinese' | 'russian' | string,
	icon: 'flag-uk' | 'flag-spanish' | 'flag-china' | 'flag-russia' | string,
	action?: 'set-lang' | string,
	active?: boolean
}
