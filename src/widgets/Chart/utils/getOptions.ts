import type {
  ChartOptions,
  ChartTypeRegistry,
  PluginOptionsByType,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

export function getOptions(
  lockValue: number | null,
  lastPrice: number,
  startPrice: number
): ChartOptions {
  return {
    resizeDelay: 100,
    font: {
      family: "Unbounded",
      size: 8,
      weight: "normal",
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
    } as _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>,
    maintainAspectRatio: false,
    scales: {
      y: {
        border: {
          dash: [5, 5],
        },
        display: true,
        position: "right",
        grace: "0%",
        suggestedMax: (ctx) => {
          const dataset = ctx.chart.data.datasets[0].data;
          const max = Math.max(
            ...(dataset.slice(0, dataset.length - 21) as number[])
          );
          return max + 10;
        },
        suggestedMin: (ctx) => {
          const dataset = ctx.chart.data.datasets[0].data;
          const min = Math.min(
            ...(dataset.slice(0, dataset.length - 21) as number[])
          );
          return min - 10;
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          display: true,
          stepSize: 10,
          z: 1,
          align: "end",
          font: {
            size: 8,
            weight: "normal",
          },
        },
      },
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
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
        radius: 0,
      },
      line: {
        tension: 0.5,
        borderJoinStyle: "miter",
        borderWidth: 2,
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
  };
}
