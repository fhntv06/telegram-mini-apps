import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js'
import { useSelector } from 'react-redux'
import { numberLastPoint } from '../shared/constants'
const maxChartPoints = 110

const offsetLastPoint = 11
const arrayDataSplice = new Array(maxChartPoints - numberLastPoint - 1).fill(null)

const createInitialData = (history: any) => ({
  labels: history.map(() => ''),
  datasets: [
    { data: history.map((el: any) => el) },
  ],
})

export const useChartData = () => {
  const { btcPrice, priceHistory } = useSelector((state: any) => state.gameStatus)

  const [chartData, setChartData] = useState<ChartData<'line'>>(createInitialData(priceHistory))
  const [lockValue, setLockValue] = useState<number | null>(null);

  useEffect(() => {
    if (btcPrice && chartData.datasets[0].data.length) {
      setLockValue(btcPrice)
    }

    updateData()
  }, [btcPrice]);

  const updateData = useCallback(() => {
    setChartData((prevData: any) => {
      const data = prevData.datasets[0].data

      if (data.length === 100) {
        data.splice(
          numberLastPoint,
          offsetLastPoint,
          ...arrayDataSplice
        );
      }

      if (data.length > maxChartPoints - 1) data.shift()

      if (btcPrice) data.splice(numberLastPoint, 0, btcPrice)

      const changeColorSegments = (ctx: any) => {
        return (ctx.p0.raw < btcPrice && ctx.p1.raw < btcPrice) ? '#FD2D39' : '#34D269';
      }

      return {
        ...prevData,
        datasets: [
          {
            data,
            pointRadius: function (context) {
              if (context.raw === 0) {
                return 3;
              } else {
                return context.dataIndex === numberLastPoint ? 5 : 0;
              }
            },
          }
        ],
      }
    })
  }, [btcPrice]);

  return {
    chartData,
    lockValue,
    updateData,
    maxChartPoints,
    btcPrice
  }
}