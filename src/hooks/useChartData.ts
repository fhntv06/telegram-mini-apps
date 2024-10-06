import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js'

const maxChartPoints = 110

const chartOptions = {
  borderWidth: 2,
  borderColor: '#28DA64',
  pointStyle: 'circle',
  pointBackgroundColor: '#fff',
  fill: 'start',
  backgroundColor: '#34D26947',
}

const createInitialData = (history: any) => ({
  labels: history?.map((el: any) => ''),
  datasets: [
    {
      data: history?.map((el: any) => el.lastPrice / 10000),
      ...chartOptions,
    },
  ],
})

export const useChartData = (priceHistory: any, gameStatus: any) => {
  const lastPrice = gameStatus.PriceInfo.lastPrice / 10000;
  
  const [chartData, setChartData] = useState<ChartData<'line'>>(
    createInitialData(priceHistory)
  );
  const [lockValue, setLockValue] = useState<number | null>(null);

  useEffect(() => {
    if (priceHistory) {
      setChartData(createInitialData(priceHistory));
    }
  }, [priceHistory])

  useEffect(() => {
    if (lastPrice && chartData.datasets[0].data.length) {
      setLockValue(lastPrice)
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

      if (lastPrice) data.splice(89, 0, lastPrice)

      return {
        labels,
        datasets: [
          {
            data,
            pointRadius: function (context) {
              if (context.raw === 0) {
                return 3;
              } else {
                return context.dataIndex === 89 ? 5 : 0;
              }
            },
            ...chartOptions,
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