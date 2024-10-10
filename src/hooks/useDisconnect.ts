import { useTonConnectUI } from '@tonconnect/ui-react'
import { removeUser } from '../app/store/slices/user'
import { useDispatch } from 'react-redux'

export const useDisconnect = () => {
  const [tonConnectUI] = useTonConnectUI()
  const dispatch = useDispatch()
  return () => {
    dispatch(removeUser())

    tonConnectUI.disconnect()
  }
}