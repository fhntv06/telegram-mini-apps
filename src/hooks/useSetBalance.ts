import { useDispatch, useSelector } from 'react-redux'
import { useTonAddress } from '@tonconnect/ui-react'
import { getBalance, getDemoBalance } from '../app/api'
import { setUserDataWallet } from '../app/store/slices'
import { isDemoMode } from '../shared'
import WebApp from "@twa-dev/sdk";

export const useSetBalance = () => {
	const dispatch = useDispatch()
  const userDataWallet = useSelector((state: any) => state.userDataWallet)
  const { gameMode } = useSelector((state: any) => state.modeSettings)
  const address = useTonAddress()

    // TODO: Это убрать в кнопку подключения и перенести в отдельный хук
    const method = gameMode === isDemoMode ? getDemoBalance : getBalance
    const param = gameMode === isDemoMode ? WebApp.initData : address

    const updateBalance = async () => {
      console.log('updateBalance')

      // @ts-ignore
      const balance = await method('param')
        .then(res => res.data.balance)
        .catch((error) => {
          if (!param) new Error(`Error in ${method}: param ${param} is undefined !`)

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
