import { useState, useEffect } from 'react'
import { IGameStatus } from '../app/providers/types'
import { initialDataGameStatus } from '../shared/constants'

const urlSocket = `${import.meta.env.VITE_SOCKET_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}`

const initTestData = true

export const useGameSocket = () => {
  const [data, setData] = useState<IGameStatus>(initialDataGameStatus)
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
    gameSocket.onmessage = (event) => setData(JSON.parse(event.data))
    gameSocket.onerror = (event) => console.log("game socket error: ", event)
  }

  const handlerTestConnection = () => {
    const signs = [-1, 1];
    const defaultMax = 62050
    const defaultMin = 61950

    const interval = setInterval(() => {
      const offsetDynamic = Math.random() * (50 - 10 + 1) + 10
      const randomIndex = Math.floor(Math.random() * signs.length)
      const signOffsetDynamic = signs[randomIndex] * offsetDynamic

      console.log(signOffsetDynamic)

      const dynamicValue = (Math.random() * (defaultMax + signOffsetDynamic - defaultMin + signOffsetDynamic + 1)) + defaultMin + signOffsetDynamic
      // Эмуляция получения нового сообщения каждую секунду
      // Обновляем состояние с новыми данными

      // @ts-ignore
      setData((prevData: IGameStatus) => ({
        ...prevData, // Сохраняем все предыдущие данные
        btcPrice: dynamicValue, // Обновляем поле priceHistory
      }))

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