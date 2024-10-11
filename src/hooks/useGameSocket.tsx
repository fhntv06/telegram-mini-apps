import { useState, useEffect } from 'react'
import { IGameStatus } from '../app/providers/types'
import { initialDataGameStatus } from '../shared/constants'

const urlSocket = `${import.meta.env.VITE_SOCKET_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`

export const useGameSocket = () => {
  const [data, setData] = useState<IGameStatus>(initialDataGameStatus);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const gameSocket = new WebSocket(urlSocket)

    gameSocket.onopen = () => {
      console.log("game socket connected");
    };
    gameSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения"); // например, "убит" процесс сервера
      }

      console.log("Код: " + event.code + " причина: " + event.reason)

      setError(true)
      console.log('Подключение тестовых данных за место сокета! Проверьте соединение с сервером!')
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
      } = JSON.parse(event.data)

      const data = {
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
        winPercent: { downPercent: down_percent, upPercent: up_percent },
      }

      setData(data)
    };
    gameSocket.onerror = (event) => {
      console.log("game socket error: ", event)
    }
  }, [])

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        // Эмуляция получения нового сообщения каждую секунду
        // Обновляем состояние с новыми данными
        setData((prevData: IGameStatus) => ({
          ...prevData, // Сохраняем все предыдущие данные
          btcPrice: (Math.random() * (62001 - 62000 + 1)) + 62000 // Обновляем поле priceHistory
        }));
      }, 500)
      
      return () => clearInterval(interval)
    }
  }, [error]);

  return data
}