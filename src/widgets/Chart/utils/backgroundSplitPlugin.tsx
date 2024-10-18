import { type Plugin } from "chart.js";

export const backgroundSplitPlugin: Plugin<"line"> = {
  id: "backgroundSplit",
  beforeDraw: (chart, _args, options) => {
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

    // Dashed line
    const createDashLine = (
      x: number,
      y: number,
      width: number,
      fillColor: string
    ) => {
      ctx.setLineDash([4, 4]); // Устанавливаем стиль линии как пунктирную
      ctx.beginPath(); // Начинаем новый путь
      ctx.strokeStyle = fillColor;
      ctx.moveTo(x, y); // Перемещаемся к начальной точке
      ctx.lineTo(x + width, y); // Рисуем линию до конечной точки
      ctx.stroke();
      ctx.fill();
    }

    y = isNaN(y) ? 0 : y;

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

    // Линия по середине
    createDashLine(chartArea.left, y, chartArea.right, '#FFFFFF3D')
  },
};
