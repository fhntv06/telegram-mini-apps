import { getPriceHistory } from '../app/api'
import { useEffect, useState } from 'react'
import { initialDataPriceHistory } from '../shared'

const initTestData: boolean = import.meta.env.VITE_IS_DEV_MODE === 'true'

export const usePriceHistory = () => {
  const [priceHistory, setPriceHistory] = useState<number[]>(initTestData ? initialDataPriceHistory : [])

  useEffect(() => {
    if (!priceHistory.length) {
      getPriceHistory()
        .then(async (res) => setPriceHistory(res.data))
        .catch((error) => console.log('Error in getPriceHistory: ', error))
    }
  }, [priceHistory.length])


  return priceHistory
}
