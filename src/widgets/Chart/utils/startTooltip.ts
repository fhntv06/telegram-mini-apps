import { type Plugin } from "chart.js";

export const startTooltip: Plugin<"line"> = {
  id: "startTooltip",
  afterDraw: (chart, args, options) => {
    if (
      options.startPrice === 0 ||
      options.startPrice === null ||
      options.startPrice === undefined
    )
      return;
    const { ctx } = chart;
    ctx.save();

    const dataset = chart.data.datasets[0].data;

    const minValue = Math.min(
      ...(dataset.slice(0, dataset.length - 21) as number[])
    );
    const maxValue = Math.max(
      ...(dataset.slice(0, dataset.length - 21) as number[])
    );

    const procent = (options.startPrice - minValue) / (maxValue - minValue);
    const minValueY = chart.scales.y.getPixelForValue(minValue);
    const maxValueY = chart.scales.y.getPixelForValue(maxValue);

    let y = minValueY - procent * (minValueY - maxValueY);
    y = isNaN(y) ? 0 : y;

    const widthTooltip = 110;
    const heightTooltip = 30;
    const marginX = 10;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.roundRect(marginX, y - 10, widthTooltip, heightTooltip, [8]);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.moveTo(marginX + 15, y - 10);
    ctx.lineTo(marginX + widthTooltip - 15, y - 10);
    ctx.lineTo(marginX + widthTooltip - 25, y - 20);
    ctx.lineTo(marginX + 25, y - 20);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // text
    const gradient = ctx.createLinearGradient(0, y - 15, 0, y);
    gradient.addColorStop(0, "rgb(251, 226, 70)");
    gradient.addColorStop(1, "rgb(225, 131, 17)");
    ctx.fillStyle = gradient;
    ctx.font = "8px Unbounded";
    ctx.textAlign = "center";
    ctx.fillText("START PRICE", marginX + widthTooltip / 2, y - 8);
    ctx.restore();

    // text
    ctx.font = "12px Unbounded";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "$ " + new Intl.NumberFormat("en").format(options.startPrice),
      marginX + widthTooltip / 2,
      y + 10
    );
    ctx.restore();
  },
};
