import { type Plugin } from "chart.js";

export const backgroundSplitPlugin: Plugin<"line"> = {
  id: "backgroundSplit",
  beforeDraw: (chart, _args, options) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    const dataset = chart.data.datasets[0].data;
    if (!ctx || !chartArea || dataset.length === 0) return;

    const y = (options.gamePhase !== 3 || options.startBtcPrice === 0)
      ? chart.scales.y.getPixelForValue(options.btcPrice)
      : chart.scales.y.getPixelForValue(options.startBtcPrice)

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

    // верхний градент зеленого цвета
    const gradientGreen = ctx.createLinearGradient(0, 0, 0, isNaN(y) ? 0 : y - 1);
    gradientGreen.addColorStop(0, "rgba(52, 210, 105, 0)");
    gradientGreen.addColorStop(0.2, "rgba(52, 210, 105, 0.1)");
    gradientGreen.addColorStop(0.3, "rgba(52, 210, 105, 0.15)");
    gradientGreen.addColorStop(0.5, "rgba(52, 210, 105, 0.3)");
    gradientGreen.addColorStop(1, "rgba(52, 210, 105, 0.4)");

    drawRoundedRect(chartArea.left, 0, chartArea.right, y, gradientGreen);

    // нижний градент красного цвета
    const gradientRed = ctx.createLinearGradient(0, y + 1, 0, chartArea.bottom);
    gradientRed.addColorStop(0, "rgba(253, 45, 57, 0.4)");
    gradientRed.addColorStop(0.4, "rgba(253, 45, 57, 0.3)");
    gradientRed.addColorStop(0.6, "rgba(253, 45, 57, 0.15)");
    gradientRed.addColorStop(0.8, "rgba(253, 45, 57, 0.1)");
    gradientRed.addColorStop(1, "rgba(253, 45, 57, 0)");

    drawRoundedRect(chartArea.left, y, chartArea.right, chartArea.bottom + 50, gradientRed);
  },
};
