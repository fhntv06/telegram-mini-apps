import { getPriceHistory } from '../app/api';
import { useEffect, useState } from 'react';
import { initialDataPriceHistory } from '../shared/constants.ts'

export const usePriceHistory = () => {
  const [priceHistory, setPriceHistory] = useState<number[]>(initialDataPriceHistory);

  useEffect(() => {
    console.log('Запрос getPriceHistory!')
    getPriceHistory()
      .then(async (res) => setPriceHistory(res.data))
      .catch((error) => console.log('Error in getPriceHistory: ', error))
  }, [])


  return priceHistory
}