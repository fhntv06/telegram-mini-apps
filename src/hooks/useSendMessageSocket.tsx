import { gameSocket } from '../shared/constants'

export const useSendMessageSocket = (
  gameMode: 'ON_CHAIN' | 'DEMO' = 'ON_CHAIN',
  ticker: 'BTC-30' = 'BTC-30'
): (gameMode?: string, ticker?: string) => void => {

  return () => {
    if (gameSocket && gameSocket.readyState === WebSocket.OPEN) {
      try {
        // Отправляем сообщение в формате JSON
        gameSocket.send(JSON.stringify({ ticker, gameMode }));
        console.log("Message sent:", { ticker, gameMode });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
};
