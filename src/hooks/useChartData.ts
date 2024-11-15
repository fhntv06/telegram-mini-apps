import { useState, useEffect } from 'react'
import { ChartData } from 'chart.js'
import { useSelector } from 'react-redux'
import { numberLastPoint } from '../shared/constants'

const createInitialData = (history: any) => ({
  labels: [...history, '', '', ''].map(() => ''), // added label for create offset x-axis
  datasets: [
    { data: history.map((el: any) => el) },
  ],
})

export const useChartData = () => {
  const { btcPrice, priceHistory, startBtcPrice } = useSelector((state: any) => state.gameStatus)

  const [chartData, setChartData] = useState<ChartData<'line'>>(createInitialData(priceHistory))

  useEffect(() => {
    updateData()
  }, [btcPrice])

  const updateData = () => {
    setChartData((prevData: any) => {
      const data = prevData.datasets[0].data
      const labels = prevData.labels;

      // нужно добавить логику чтобы когда цена сильно уходит наверх и startBtcPrice пропадает из виду
      // то начинать добавить (push) без shift чтобы график растягивался и было видно точку startBtcPrice
      // и вниз тоже самое

      const biggerTicks = startBtcPrice < Math.min(...data) || startBtcPrice > Math.max(...data)

      if (biggerTicks) {
        labels.push('')
      } else {
        data.shift()
      }

      data.push(btcPrice)

      return {
        ...prevData,
        datasets: [
          {
            data,
            pointRadius: function (context) {
              if (biggerTicks) {
                return context.dataIndex === data.length - 2
              } else {
                return context.dataIndex === numberLastPoint  ? 5 : 0;
              }
            },
          }
        ],
      }
    })
  }

  return chartData
}