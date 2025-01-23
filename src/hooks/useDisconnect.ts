import { useTonConnectUI } from '@tonconnect/ui-react'
import { removeUserDataWallet } from '../app/store/slices'
import { useDispatch } from '../hooks/'

export const useDisconnect = () => {
  const [tonConnectUI] = useTonConnectUI()
  const dispatch = useDispatch()
  return () => {
    dispatch(removeUserDataWallet())

    tonConnectUI.disconnect()
      .then(r => console.log('Success disconnect! Result: ', r))
      .catch(r => new Error('Error in disconnect! Error: ' + r))
  }
}
