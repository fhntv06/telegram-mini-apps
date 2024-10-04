import { useState, useEffect } from 'react'
import { GameSocketContext } from '../contexts'
import { urlWebSocket } from '../config'

const gameSocket = new WebSocket(urlWebSocket);

export const GameSocketProvider = ({ children }: { children: React.ReactNode } ) => {
  const [gameHistory, setGameHistory] = useState<any[]>([]);

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
      const res = JSON.parse(event.data);

      // TODO: распилить данные на store
      
      setGameHistory(res)

      console.log('res ', res);
    };
    gameSocket.onerror = (event) => {
      console.log("game socket error: ", event);
    };
  }, []);

  return (
    <GameSocketContext.Provider value={gameHistory}>
      {children}
    </GameSocketContext.Provider>
  );

}