import { useDispatch, useSelector } from 'react-redux'
import { useTonAddress } from '@tonconnect/ui-react'
import { getBalance, getDemoBalance } from '../app/api/user/'
import { setUserDataWallet } from '../app/store/slices/user'
import { useUserData } from './'
import { isDemoMode } from '../shared/constants'

export const useSetBalance = () => {
	const userData = useUserData()
	const dispatch = useDispatch()
    const userDataWallet = useSelector((state: any) => state.userDataWallet)

    if (!userData) return 0

	const { gameMode } = useSelector((state: any) => state.modeSettings)
	const address = useTonAddress()

    // TODO: Это убрать в кнопку подключения и перенести в отдельный хук
    const method = gameMode === isDemoMode ? getDemoBalance : getBalance
    const param = gameMode === isDemoMode ? userData.id : address

    const updateBalance = async () => {
        console.log('updateBalance')
        // @ts-ignore
        const balance = await method(param)
            .then(res => res.data.balance)
            .catch((error) => {
                new Error(error)

                return 0
            })

        dispatch(
            setUserDataWallet({
                ...userDataWallet,
                balance
            })
        )
    }

    return { updateBalance }
}