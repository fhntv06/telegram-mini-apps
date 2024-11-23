import { useState, useEffect } from 'react'
import { IGameStatus } from '../app/providers/types'
import {
  // initialDataGameStatus,
  gameSocket,
  urlSocket,
} from '../shared/constants'

const initTestData = false
export const useGameSocket = () => {
  const [socket, setSocket] = useState<WebSocket>(gameSocket)
  const [data, setData] = useState<IGameStatus>()

  const handlerConnection = () => {
    socket.onopen = () => console.log("game socket connected")
    socket.onclose = (event) => {
      console.log(event.wasClean ? "Соединение закрыто чисто" : "Обрыв соединения");
      console.log("Код: " + event.code + " причина: " + event.reason)
      console.log('Переподключение к сокету!')

      const timer = setTimeout(() => {
        setSocket(new WebSocket(urlSocket))
        clearTimeout(timer)
      }, 2000)
    }
    socket.onmessage = (event) => setData(JSON.parse(event.data))
    socket.onerror = (event) => console.log("game socket error: ", event)
  }

  const handlerTestConnection = () => {
    const signs = [-1, 1];
    let defaultMax = 62995
    let defaultMin = 50005

    let count = 50;

    const interval = setInterval(() => {
      const offsetDynamic = Math.random() * (count <= 0 ? 5 : 250)
      const signOffsetDynamic = signs[Math.floor(Math.random() * signs.length)] * offsetDynamic

      const dynamicValue = (Math.random() * (defaultMax + signOffsetDynamic - defaultMin - signOffsetDynamic + 1)) + defaultMin - signOffsetDynamic
      // Эмуляция получения нового сообщения каждую секунду
      // Обновляем состояние с новыми данными

      // @ts-ignore
      setData((prevData: IGameStatus) => ({
        ...prevData, // Сохраняем все предыдущие данные
        btcPrice: dynamicValue, // Обновляем поле priceHistory
      }))

      if (count === 40) {
        defaultMin = 60000
      } else if (count === 20) {
        defaultMin = 61000
        defaultMax = 62250
      } else if (count === 0) {
        defaultMin = 61995
        defaultMax = 62050
      } else if (count === -20) {
        defaultMin = 61999
        defaultMax = 62010
      } else if (count === -40) {
        count = 50
      }
      count--;

    }, 500)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (initTestData) {
      handlerTestConnection()
    } else {
      handlerConnection()
    }
  }, [socket])

  return data
}
