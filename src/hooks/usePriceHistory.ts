import { getPriceHistory } from '../app/api';
import { useEffect, useState } from 'react';
import { initialDataPriceHistory } from '../shared/constants.ts'

export const usePriceHistory = () => {
  const [priceHistory, setPriceHistory] = useState<number[]>([])

  useEffect(() => {
    console.log('Запрос getPriceHistory!')
    setPriceHistory(initialDataPriceHistory)

    return
    getPriceHistory()
      .then(async (res) => setPriceHistory(res.data))
      .catch((error) => {
        console.log('Error in getPriceHistory: ', error)
        setPriceHistory(initialDataPriceHistory)
        console.log('Подключение тестовых данных за место истории цен! Проверьте соединение с сервером!')
      })
  }, [])


  return priceHistory
}