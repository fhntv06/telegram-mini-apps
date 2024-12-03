import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk';
import { setUserDataTelegram } from '../app/store/slices/user'
import { useDispatch } from 'react-redux'

export const useUserData = () => {
  const initData = WebApp.initDataUnsafe;
  const dispatch = useDispatch()

  useEffect(() => {
    if (initData && initData.user) {
      dispatch(
        setUserDataTelegram(initData.user)
      )
    }
  }, [])

  return initData.user
}
