import { Dispatch, SetStateAction } from 'react'

export interface IModalSelectGameMode {
	isOpen?: boolean
	closeHandler: Dispatch<SetStateAction<boolean>>
	className?: string
}
