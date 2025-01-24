import { setModeSettings } from '../app/store/slices'
import { useDispatch, useSelector } from '../hooks'
import {typeDemoMode, typeOnChainMode, typeStarsGame} from '../shared/types'
import { isStarsMode } from '../shared'

export const useChangeGameMode = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((state) => state.socket)

  return (
    gameMode: typeOnChainMode | typeDemoMode | typeStarsGame = isStarsMode,
    ticker: 'BTC-30' = 'BTC-30'
  ): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      dispatch(
        setModeSettings({
          coin: 'btc',
          time: {
            text: '$BTC, 30s',
            value: 30,
            unit: 's'
          },
          ticker,
          gameMode
        })
      )

      try {
        // Отправляем сообщение в формате JSON
        socket.send(JSON.stringify({ ticker, gameMode }))
        console.log("Message sent:", { ticker, gameMode })
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  };
};
