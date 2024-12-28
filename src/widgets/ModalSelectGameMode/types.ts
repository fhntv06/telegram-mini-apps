import { typeDemoMode, typeOnChainMode } from '../../shared/types'

export interface IModalSelectGameMode {
	isOpen?: boolean
	closeHandler: () => void
	className?: string
	initialGameMode?: typeDemoMode | typeOnChainMode
}
