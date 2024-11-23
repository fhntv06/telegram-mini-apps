import { useDispatch } from 'react-redux'
import { gameSocket } from '../shared/constants'
import { setModeSettings } from '../app/store/slices/mode'

export const useChangeGameMode = () => {
  const dispatch = useDispatch()

  return (
    gameMode: 'ON_CHAIN' | 'DEMO' = 'ON_CHAIN',
    ticker: 'BTC-30' = 'BTC-30'
  ): void => {
    if (gameSocket && gameSocket.readyState === WebSocket.OPEN) {
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
        gameSocket.send(JSON.stringify({ ticker, gameMode }))
        console.log("Message sent:", { ticker, gameMode })
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  };
};
