import { useState, useEffect } from 'react'
import { IGameStatus } from '../app/providers/types'
// import { initialDataGameStatus } from '../shared/constants'

const urlSocket = `${import.meta.env.VITE_SOCKET_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`

const initTestData = false

export const useGameSocket = () => {
  const [data, setData] = useState<IGameStatus>()
  const [error, setError] = useState<boolean>(false)

  const handlerConnection = () => {
    const gameSocket = new WebSocket(urlSocket)

    gameSocket.onopen = () => console.log("game socket connected")
    gameSocket.onclose = (event) => {
      console.log(event.wasClean ? "Соединение закрыто чисто" : "Обрыв соединения");
      console.log("Код: " + event.code + " причина: " + event.reason)
      console.log('Переподключение к сокету!')

      const timer = setTimeout(() => {
        setError((prev) => !prev)
        clearTimeout(timer)
      }, 2000)
    }
    gameSocket.onmessage = (event) => {
      const {
        up_pool_data: { bets: players_img_up, betPool: betPoolUp },
        down_pool_data: { bets: players_img_down, betPool: betPoolDown },
        total_bets, btc_price, start_btc_price, game_phase, phase_time_until, game_result,
        last_3_games_res,
        live_players,
        all_time_wins,
        win_percent: { down_percent, up_percent }
      } = JSON.parse(event.data)

      const data = {
        upPoolData: {
          bets: players_img_up,
          betPool: betPoolUp,
        },
        downPoolData: {
          bets: players_img_down,
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
    gameSocket.onerror = (event) => console.log("game socket error: ", event)
  }

  const handlerTestConnection = () => {
    const interval = setInterval(() => {
      // Эмуляция получения нового сообщения каждую секунду
      // Обновляем состояние с новыми данными

      // @ts-ignore
      setData((prevData: IGameStatus) => ({
        ...prevData, // Сохраняем все предыдущие данные
        btcPrice: (Math.random() * (62001 - 62000 + 1)) + 62000 // Обновляем поле priceHistory
      }));

    }, 500)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (initTestData) {
      handlerTestConnection()
    } else {
      handlerConnection()
    }
  }, [error])

  return data
}