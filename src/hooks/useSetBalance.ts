import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import { setUserDataWallet } from '../app/store/slices'
import { getStarsBalance } from '../app/api/stars'
import { useDispatch, useSelector } from './'

export const useSetBalance = () => {
	const dispatch = useDispatch()
  const userDataWallet = useSelector((state) => state.userDataWallet)
  const [balance, setBalance] = useState<number>(Number(userDataWallet.balance))

  const updateBalance = () => {
    getStarsBalance(WebApp.initData)
      .then(res => setBalance(res.data.balance))
      .catch((error) => {
        if (!WebApp.initData) new Error(`Error in getStarsBalance: param WebApp.initData is undefined !`)

        new Error(error)
      })
  }

  useEffect(() => {
    dispatch(
      setUserDataWallet({
        ...userDataWallet,
        balance
      })
    )
  }, [balance])

  return { balance, updateBalance }
}
