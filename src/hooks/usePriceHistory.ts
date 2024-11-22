import { getPriceHistory } from '../app/api'
import { useEffect, useState } from 'react'
import { countPointsChart, initialDataPriceHistory } from '../shared/constants.ts'

export const usePriceHistory = () => {
  const [priceHistory, setPriceHistory] = useState<number[]>([])

  useEffect(() => {
    console.log('Запрос getPriceHistory!')
    getPriceHistory()
      .then(async (res) => setPriceHistory(res.data.slice(0,countPointsChart)))
      .catch((error) => {
        console.log('Error in getPriceHistory: ', error)
        setPriceHistory(initialDataPriceHistory)
        console.log('Подключение тестовых данных за место истории цен! Проверьте соединение с сервером!')
      })
  }, [])


  return priceHistory
}
