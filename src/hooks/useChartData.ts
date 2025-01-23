import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js'
import { useSelector } from './'
import { numberLastPoint } from '../shared'

const createInitialData = (history: number[] | undefined) => (
  (history && history?.length)
    ? {
      // 4 '' for mobile
      labels: [...history, '', '', '', ''].map(() => ''), // added label for create offset x-axis
      datasets: [
        { data: history.map((el: number) => el) },
      ],
    } : {
      labels: [],
      datasets: [ { data: [] } ]
    }
)

export const useChartData = () => {
  const { btcPrice, priceHistory } = useSelector((state) => state.gameStatus)

  const [chartData, setChartData] = useState<ChartData<'line'>>(createInitialData(priceHistory))

  const updateData = useCallback(() => {
    setChartData((prevData: any) => {
      const data = prevData.datasets[0].data;

      data.shift()
      data.push(btcPrice)

      return {
        ...prevData,
        datasets: [
          {
            data,
            pointRadius: function (context) {
              return context.dataIndex === numberLastPoint ? 5 : 0;
            },
          }
        ],
      }
    })
  }, [btcPrice])

  useEffect(() => {
    updateData()
  }, [btcPrice, updateData])

  return chartData
}
