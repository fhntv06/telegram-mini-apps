import { useTonConnectUI } from '@tonconnect/ui-react'
import { removeUserDataWallet } from '../app/store/slices'
import { useDispatch } from 'react-redux'

export const useDisconnect = () => {
  const [tonConnectUI] = useTonConnectUI()
  const dispatch = useDispatch()
  return () => {
    dispatch(removeUserDataWallet())

    tonConnectUI.disconnect()
  }
}
