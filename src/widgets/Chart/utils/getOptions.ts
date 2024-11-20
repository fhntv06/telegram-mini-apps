import type {
  ChartOptions,
  ChartTypeRegistry,
  PluginOptionsByType,
  Point
} from "chart.js";
// @ts-ignore
import { _DeepPartialObject } from 'chart.js/dist/types/utils'

const colors = {
  grid: '#FFFFFF0A',
}

const calcSuggest = (
  ctx: { chart: { data: { datasets: { data: any }[] } } },
  startBtcPrice: number,
  btcPrice: number,
): number[] => {
  const dataset = ctx.chart.data.datasets[0].data as number[]
  const max = Math.max(...dataset, startBtcPrice)
  const min = Math.min(...dataset, startBtcPrice || btcPrice )
  const offset = (max - min) * 0.01

  return [max + offset, min - offset]
}
const dynamicStep = (
  ctx: { chart: { data: { datasets: { data: number[] }[] } } },
  startBtcPrice: number,
  btcPrice: number,
): number => {
  const dataset = ctx.chart.data.datasets[0].data
  const max = Math.max(...dataset, startBtcPrice)
  const min = Math.min(...dataset, startBtcPrice || btcPrice)
  const range = Math.abs(max - min)

  console.log({
    dataset,
    max,
    min,
    startBtcPrice,
    btcPrice,
    or: startBtcPrice || btcPrice
  })

  if (range > 5000) {
    console.log({
    step: 2000,
    range,
  })
    return 2000
  } else if (range > 1500) {
    console.log({
    step: 500,
    range,
  })
    return 250
  } else if (range > 500) {
    console.log({
    step: 100,
    range,
  })
    return 100
  } else if (range > 100) {
    console.log({
    step: 50,
    range,
  })
    return 50
  } else if (range > 50) {
    console.log({
      step: 10,
      range,
    })
    return 10
  } else if (range > 10) {
    console.log({
    step: 2,
    range,
  })
    return 2
  } else if (range > 1) {
    console.log({
      step: 1,
      range,
    })
    return 1
  } else if (range > 0.5) {
    console.log({
      step: 1,
      range,
    })
    return 1
  } else if (range > 0.05) {
    console.log({
      step: 0.1,
      range,
    })
    return 0.1
  } else if (range > 0.005) {
    console.log({
      step: 0.01,
      range,
    })
    return 0.01
  } else {
    console.log({
      step: 0.005,
      range,
    })
    return 0.005
  }
}

export function getOptions(
  btcPrice:  number | Point,
  startBtcPrice: number,
  gamePhase: number,
): ChartOptions {
  return {
    responsive: true,
    resizeDelay: 100,
    font: {
      family: 'Inter',
      size: 8,
      weight: 500,
    },
    plugins: {
      showTooltip: { btcPrice, startBtcPrice, gamePhase },
      startTooltip: { startBtcPrice, btcPrice, gamePhase },
      backgroundSplit: { btcPrice, startBtcPrice, gamePhase },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
      filler: {
        propagate: false
      }
    } as _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>,
    maintainAspectRatio: false,
    scales: {
      y: {
        border: {
          dash: [4, 4],
        },
        display: true,
        position: 'right', // позиция градации значенийпо оси Y
        // @ts-ignore
        suggestedMax: (ctx: any) => calcSuggest(ctx, startBtcPrice, btcPrice, gamePhase)[0],
        // @ts-ignore
        suggestedMin: (ctx: any) => calcSuggest(ctx, startBtcPrice, btcPrice, gamePhase)[1],
        grid: {
          display: true, // горизонтальные пунктирные линии
          color: colors.grid,
        },
        ticks: { // значения по оси Y
          display: true,
          // @ts-ignore
          stepSize: (ctx: any) => (dynamicStep(ctx, startBtcPrice, btcPrice as number)),
          z: 1,
          align: "start",
          font: {
            size: 8,
            weight: 500,
          },
        },
      },
      x: {
        grid: {
          display: false,
          color: colors.grid,
        },
        ticks: { // значения по оси Y
          display: true,
          color: "rgba(255, 255, 255, 0)",
          maxTicksLimit: 5,
        },
      },
    },
    animations: {
      x: {
        delay: 0,
        duration: 300,
        easing: "linear",
        type: "number",
      },
      backgroundSplit: {
        delay: 0,
        duration: 300,
        easing: "linear",
      },
    },
    elements: {
      point: {
        radius: 0, // радиус точки
        backgroundColor: '#fff',
      },
      line: {
        tension: 0.5, // натяжение
        borderJoinStyle: 'round', // обводка углов в местах соединения линий
        borderWidth: 2, // ширина линии
        borderColor: '#BFBFC0', // цвет линии
      },
    },
    layout: {
      padding: {
        top: 80,
        right: 8,
        bottom: -15,
        left: 0,
      },
    },
    animation: {
      duration: 0,
    },

  };
}
