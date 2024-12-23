import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk';
import { setUserDataTelegram } from '../app/store/slices'
import { useDispatch } from './'

export const useUserData = () => {
  const initData = WebApp.initDataUnsafe;
  const dispatch = useDispatch()

  useEffect(() => {
    if (initData && initData.user) {
      dispatch(setUserDataTelegram(initData.user))
    }
  }, [dispatch, initData])

  return initData.user
}
