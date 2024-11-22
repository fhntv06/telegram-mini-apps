import { gameSocket } from '../shared/constants'

export const useSendMessageSocket = () => {
  return (
    gameMode: 'ON_CHAIN' | 'DEMO' = 'ON_CHAIN',
    ticker: 'BTC-30' = 'BTC-30'
  ): void => {
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
