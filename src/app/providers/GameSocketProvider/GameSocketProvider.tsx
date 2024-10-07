import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux';
import { PriceHistoryContext, GameStatusContext } from '../../contexts'
import { urlWebSocket } from '../../config'
import { initialData } from '../../constants';
import { IGameStatus } from '../types'
// import {setUser} from '../../store/slices/userSlice';
import { getPriceHistory } from '../../api';

const gameSocket = new WebSocket(urlWebSocket);

console.log(gameSocket);

export const GameSocketProvider = ({ children }: { children: React.ReactNode } ) => {
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<IGameStatus>(initialData);
  // const dispatch = useDispatch();

  useEffect(() => {
    // TODO: запрос за priceHistory
    getPriceHistory().then(async (res) => {
      console.log('res getPriceHistory: ', res);

      const pricesArray = await res.data.json();

      console.log('pricesArray getPriceHistory: ', pricesArray);

      setPriceHistory(pricesArray)
    })

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
      const {
        up_pool_data: { players_img: players_img_down, betPool: betPoolUp },
        down_pool_data: { players_img: players_img_up, betPool: betPoolDown },
        total_bets, btc_price, start_btc_price, game_phase, phase_time_until, game_result,
        last_3_games_res,
        live_players,
        all_time_wins,
        win_percent: { down_percent, up_percent }
      } = JSON.parse(event.data);// TODO: переделать на store

      // TODO: распилить данные на store
      // TODO: похоже не нужен redux
      // console.log(JSON.parse(event.data))

      // dispatch(
      //   setUser(dataProfile.data.profile)
      // );

      setGameStatus({
        upPoolData: {
          playersImg: players_img_up,
          betPool: betPoolUp,
        },
        downPoolData: {
          playersImg: players_img_down,
          betPool: betPoolDown
        },
        totalBets : total_bets,
        btcPrice: btc_price,
        startBtcPrice: start_btc_price,
        gamePhase: game_phase,
        phaseTimeUntil: phase_time_until,
        gameResult: game_result,
        last3GamesRes: last_3_games_res,
        livePlayers: live_players,
        allTimeWins: all_time_wins,
        winPercent: { downPercent: down_percent, upPercent: up_percent }
      })

      // switch (MessageType) {
      //   case 'PriceHistory':
      //     setPriceHistory(Data)
      //     break;
      //   case 'GameStatus':
      //     setGameStatus(Data)
      //     break;
      // }
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