import { useState, useEffect } from 'react'
import { PriceHistoryContext, GameStatusContext } from '../../contexts'
import { urlWebSocket } from '../../config'
import { initialData } from '../../constants';
import { IPriceInfo, IGameStatus } from '../types'
const gameSocket = new WebSocket(urlWebSocket);

export const GameSocketProvider = ({ children }: { children: React.ReactNode } ) => {
  const [priceHistory, setPriceHistory] = useState<IPriceInfo[]>([initialData.PriceInfo]);
  const [gameStatus, setGameStatus] = useState<IGameStatus>(initialData);

  useEffect(() => {
    gameSocket.onopen = () => {
      console.log("game socket connected");
    };
    gameSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения"); // например, "убит" процесс сервера
      }

      console.log("Код: " + event.code + " причина: " + event.reason);
      setTimeout(window.location.reload, 5000);
    };
    gameSocket.onmessage = (event) => {
      const { Data, MessageType } = JSON.parse(event.data);

      // TODO: распилить данные на store
      

      switch (MessageType) {
        case 'PriceHistory':
          setPriceHistory(Data)
          break;
        case 'GameStatus':
          setGameStatus(Data)
          break;
      }
    };
    gameSocket.onerror = (event) => {
      console.log("game socket error: ", event);
    };
  }, []);


  return (
    <PriceHistoryContext.Provider value={priceHistory}>
      <GameStatusContext.Provider value={gameStatus}>
        {children}
      </GameStatusContext.Provider>
    </PriceHistoryContext.Provider>
  );

}