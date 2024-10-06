import type {
  ChartOptions,
  ChartTypeRegistry,
  PluginOptionsByType,
  Point
} from "chart.js";
// @ts-ignore
import { _DeepPartialObject } from "chart.js/dist/types/utils";

const colors = {
  grid: '#FFFFFF0A',
}

export function getOptions(
  lockValue: number | null,
  lastPrice: number | Point | null,
  startPrice: number
): ChartOptions {
  return {
    resizeDelay: 100,
    font: {
      family: "Inter",
      size: 8,
      weight: 500,
    },
    plugins: {
      showTooltip: {
        label: lastPrice,
        startPrice: startPrice,
      },
      startTooltip: {
        startPrice: startPrice,
      },
      backgroundSplit: {
        lockValue: lockValue ? lockValue : 0,
        startPrice: startPrice,
      },
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
          const dataset = ctx.chart.data.datasets[0].data;
          const max = Math.max(
            ...(dataset.slice(0, dataset.length - 21) as number[])
          );
          return max + 10;
        },
        suggestedMin: (ctx: any) => {
          const dataset = ctx.chart.data.datasets[0].data;
          const min = Math.min(
            ...(dataset.slice(0, dataset.length - 21) as number[])
          );
          return min - 10;
        },
        grid: {
          display: true, // горизонтальные пунктирные линии
          color: colors.grid,
        },
        ticks: { // значения по оси Y
          display: true,
          stepSize: 2, // шаг значения по оси Y
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
        radius: 4,
        backgroundColor: '#fff',
      },
      line: {
        tension: 0.001, // натяжение
        borderJoinStyle: 'round', // обводка углов в местах соединения линий
        borderWidth: 2, // ширина линии
        borderColor: '#ffffff99', // цвет линии
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      duration: 0,
    },
    interaction: {
      intersect: false,
    },
  };
}
