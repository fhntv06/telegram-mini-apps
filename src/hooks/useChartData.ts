import { useState, useEffect, useContext, useCallback } from 'react'
import { ChartData } from 'chart.js'
import { GameSocketContext } from '../app/contexts'

const maxChartPoints = 110

const createInitialData = (history: any) => ({
  labels: history?.map((el: any) => ''),
  datasets: [
    {
      fill: true,
      label: 'BTC Price',
      data: history?.map((el: any) => el.lastPrice / 10000),
      borderColor: '#fff',
      backgroundColor: 'transparent',
    },
  ],
})

export const useChartData = () => {
  const gameHistory = useContext<any>(GameSocketContext) // из store

  const lastPrice = 0 // gameHistory.Data.PriceInfo.lastPrice
  
  const [chartData, setChartData] = useState<ChartData<'line'>>(
    createInitialData([])
  );
  const [lockValue, setLockValue] = useState<number | null>(null);

  useEffect(() => {
    if (gameHistory) {
      setChartData(createInitialData(gameHistory));
    }
  }, [gameHistory])

  useEffect(() => {
    if (lastPrice && chartData.datasets[0].data.length) {
      setLockValue(lastPrice / 10000)
    }
  }, [lastPrice]);

  const updateData = useCallback(() => {
    setChartData((prevData: any) => {
      const data = prevData.datasets[0].data
      const labels = prevData.labels

      if (data.length === 100) {
        data.splice(
          89,
          11,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        );
        labels.push('', '', '', '', '', '', '', '', '', '');
      }

      if (data.length > maxChartPoints - 1) data.shift()
      if (labels.length > maxChartPoints - 1) labels.shift()
      labels.push('')

      if (lastPrice) data.splice(89, 0, lastPrice / 10000)

      return {
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
            borderColor: 'rgba(255, 247, 46, 1)',
            pointStyle: 'circle',
            pointRadius: function (context) {
              if (context.raw === 0) {
                return 3;
              } else {
                return context.dataIndex === 89 ? 3 : 0;
              }
            },
            pointBackgroundColor: 'rgba(255, 247, 46, 1)',
          },
        ],
      }
    })
  }, [lastPrice]);

  return {
    chartData,
    lockValue,
    updateData,
    maxChartPoints,
    lastPrice
  }
}