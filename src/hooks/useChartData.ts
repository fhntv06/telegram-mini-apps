import { useState, useEffect } from 'react'
import { ChartData } from 'chart.js'
import { useSelector } from 'react-redux'
import { numberLastPoint } from '../shared/constants.ts'

const createInitialData = (history: number[]) => ({
  // 4 '' for mobile
  labels: [...history, '', '', '', ''].map(() => ''), // added label for create offset x-axis
  datasets: [
    { data: history.map((el: number) => el) },
  ],
})

export const useChartData = () => {
  const { btcPrice, priceHistory } = useSelector((state: any) => state.gameStatus)

  const [chartData, setChartData] = useState<ChartData<'line'>>(createInitialData(priceHistory))

  useEffect(() => {
    updateData()
  }, [btcPrice])

  const updateData = () => {
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
  }

  return chartData
}