import { useContext, useEffect } from 'react'
import { useTonWallet } from '@tonconnect/ui-react'
import {
	getStorage,
	maxCountTransactionForShowModalSwitchMode, setStorage
} from '../shared'
import { useSelector } from './'
import { ModalContextTypes } from '../app/providers/types'
import { ModalContext } from '../app/contexts'

export const useCountStorageTransaction = () => {
	const { gamePhase } = useSelector((state) => state.gameStatus)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)
	const wallet = useTonWallet()

	useEffect(() => {
		// проверка, что пользователь отыграл за одну сессию maxCountTransactionForShowModalSwitchMode игр
		// открывает модалку switchMode в которой для этого условия открытие для переключения в Real Mode
		if (wallet && gamePhase === 0 && Number(getStorage('count')) == maxCountTransactionForShowModalSwitchMode) {
			openHandlerModal('switchMode')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gamePhase])

	const calculateCountStorageTransactionHandler = () => {
		const countTransaction = (Number(getStorage('count')) + 1)

		setStorage('count', countTransaction.toString())
	}

	return {
		calculateCountStorageTransactionHandler
	}
}
