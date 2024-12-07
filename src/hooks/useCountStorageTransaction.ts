import { useContext, useEffect } from 'react'
import {
	getStorage, removeStorage,
	maxCountTransactionForShowModalSwithcMode, setStorage
} from '../shared'
import { useSelector } from 'react-redux'
import { ModalContextTypes } from '../app/providers/types'
import { ModalContext } from '../app/contexts'

export const useCountStorageTransaction = () => {
	const { gamePhase } = useSelector((state: any) => state.gameStatus)
	const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

	useEffect(() => {
		if (gamePhase === 0 && Number(getStorage('count')) >= maxCountTransactionForShowModalSwithcMode) {
			openHandlerModal('switchMode')
			removeStorage('count')
		}
	}, [gamePhase])

	const calculateCountStorageTransactionHandler = () => {
		const countTransaction = (Number(getStorage('count')) + 1)

		setStorage('count', countTransaction.toString())
	}

	return {
		calculateCountStorageTransactionHandler
	}
}
