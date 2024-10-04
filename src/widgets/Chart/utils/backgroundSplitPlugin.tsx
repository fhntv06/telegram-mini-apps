import { type Plugin } from "chart.js";

export const backgroundSplitPlugin: Plugin<"line"> = {
  id: "backgroundSplit",
  beforeDraw: (chart, args, options) => {
    let y = 0;

    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    const dataset = chart.data.datasets[0].data;
    if (!ctx || !chartArea || dataset.length === 0) return;

    if (
      options.lockValue !== undefined ||
      options.lockValue !== null ||
      dataset.length <= 0
    ) {
      const dataIndex = dataset.findIndex((el) => el === options.lockValue);

      if (dataIndex !== -1 && options.startPrice === 0) {
        y = chart.scales.y.getPixelForValue(dataset[dataIndex] as number) ?? 0;
      } else if (options.startPrice !== 0) {
        const minValue = Math.min(
          ...(dataset.slice(0, dataset.length - 21) as number[])
        );
        const maxValue = Math.max(
          ...(dataset.slice(0, dataset.length - 21) as number[])
        );

        const procent = (options.startPrice - minValue) / (maxValue - minValue);
        const minValueY = chart.scales.y.getPixelForValue(minValue);
        const maxValueY = chart.scales.y.getPixelForValue(maxValue);

        y = minValueY - procent * (minValueY - maxValueY);
      }
    } else {
      y = chart.scales.y.getPixelForValue(
        dataset[dataset.length - 21] as number
      );
    }
    ctx.save();

    const drawRoundedRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      fillColor: CanvasGradient
    ) => {
      x = x - 10;
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x + width + 100, y);
      ctx.lineTo(x + width + 100, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
    };

    y = isNaN(y) ? 0 : y;
    const gradient = ctx.createLinearGradient(0, 0, 0, isNaN(y) ? 0 : y - 1);
    gradient.addColorStop(0, "rgba(145, 255, 93, 0)");
    gradient.addColorStop(0.2, "rgba(145, 255, 93, 0.05)");
    gradient.addColorStop(0.5, "rgba(145, 255, 93, 0.14)");
    gradient.addColorStop(1, "rgba(145, 255, 93, 0.5)");

    drawRoundedRect(chartArea.left, 0, chartArea.right, y, gradient);

    const gradient2 = ctx.createLinearGradient(0, y + 1, 0, chartArea.bottom);
    gradient2.addColorStop(0, "rgba(255, 50, 50, 0.5)");
    gradient2.addColorStop(0.5, "rgba(255, 50, 50, 0.15)");
    gradient2.addColorStop(0.8, "rgba(255, 50, 50, 0.05)");
    gradient2.addColorStop(1, "rgba(255, 50, 50, 0.01)");

    drawRoundedRect(
      chartArea.left,
      y,
      chartArea.right,
      chartArea.bottom + 50,
      gradient2
    );

    // Линиия по середине
    const gradient3 = ctx.createLinearGradient(0, 0, chartArea.right, 0);
    gradient3.addColorStop(0, "rgba(153, 148, 28, 0)");
    gradient3.addColorStop(0.5, "rgba(255, 247, 46, 1)");
    drawRoundedRect(chartArea.left, y - 1, chartArea.right, 2, gradient3);
  },
};
