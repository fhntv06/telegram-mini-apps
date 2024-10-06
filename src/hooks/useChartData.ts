import { useState, useEffect, useCallback } from 'react'
import { ChartData } from 'chart.js'

const maxChartPoints = 110
const numberLastPoint = 89
const offsetLastPoint = 11
const chartOptions = {
  // borderWidth: 2,
  // borderColor: '#28DA64',
  // pointStyle: 'circle',
  // pointBackgroundColor: '#fff',
  // fill: 'start',
  // backgroundColor: '#34D26947',
}

const createInitialData = (history: any) => ({
  labels: history?.map(() => ''),
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

    updateData()
  }, [lastPrice]);

  const updateData = useCallback(() => {
    setChartData((prevData: any) => {
      const data = prevData.datasets[0].data

      if (data.length === 100) {
        data.splice(
          numberLastPoint,
          offsetLastPoint,
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
      }

      if (data.length > maxChartPoints - 1) data.shift()

      if (lastPrice) data.splice(numberLastPoint, 0, lastPrice)

      const changeColorSegments = (ctx: any) => {
        return (ctx.p0.raw < lastPrice && ctx.p1.raw < lastPrice) ? '#FD2D39' : '#34D269';
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
            segment: {
              borderColor: changeColorSegments,
            },
            spanGaps: true,
            ...chartOptions,
          }
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