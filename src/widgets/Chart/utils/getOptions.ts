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
const stepSize = 10

export function getOptions(
  btcPrice:  number | Point,
  startBtcPrice: number,
  gamePhase: number,
): ChartOptions {
  return {
    responsive: true,
    resizeDelay: 100,
    font: {
      family: "Inter",
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
        suggestedMax: (ctx: any) => {
          const dataset = ctx.chart.data.datasets[0].data
          const max = Math.max(...(dataset as number[]))

          return max + max * 0.0001
        },
        suggestedMin: (ctx: any) => {
          const dataset = ctx.chart.data.datasets[0].data
          const min = Math.min(...(dataset as number[]))
          
console.log('min ', min);
console.log('min ', min - min * 0.001)

console.log('diff min ', min * 0.001)

          return min - min * 0.001
        },
        grid: {
          display: true, // горизонтальные пунктирные линии
          color: colors.grid,
        },
        ticks: { // значения по оси Y
          display: true,
          stepSize, // шаг значения по оси Y
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
        duration: 1000,
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
        top: 15,
        right: 16,
        bottom: -15,
        left: 0,
      },
    },
    animation: {
      duration: 0,
    },

  };
}
