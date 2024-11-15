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

const MIN_NUMBER = 10
const MAX_NUMBER = 25
const lastStep = 25
const currentNumber = 25

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

          console.log('max ', max)

          return max
        },
        suggestedMin: (ctx: any) => {
          const dataset = ctx.chart.data.datasets[0].data
          const min = Math.min(...(dataset as number[]))

          console.log('min ', min)

          return min
        },
        grid: {
          display: true, // горизонтальные пунктирные линии
          color: colors.grid,
        },
        ticks: { // значения по оси Y
          display: true,
          stepSize: (ctx: any) => {
            const dataset = ctx.chart.data.datasets[0].data
            const max = Math.max(...(dataset as number[]))
            const min = Math.min(...(dataset as number[]))
            const currentDifference = Math.abs(max - min);
            // всего точек должно быть 25
            // k - коэффициент
            // пример
            // если разница: max - min = 250
            // количество tick должно быть 25
            // шаг должен быть: 250 / 25 = 10
            // шаг должен быть: 5000 / 25 = 200

            console.log("diff ", max - min);

            console.log(ctx.chart.scales.y);

            // Вычисляем предыдущую разницу на основе текущего числа
            const previousDifference = (lastStep - MIN_NUMBER) / (MAX_NUMBER - MIN_NUMBER) * 100;

            const c = currentDifference > previousDifference
              ? Math.max(MIN_NUMBER, currentNumber - 1)
              : Math.min(MAX_NUMBER, currentNumber + 1);

            console.log('ticks ', c)

            return c
          },
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
