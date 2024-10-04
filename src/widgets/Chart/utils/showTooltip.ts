import { type Plugin } from "chart.js";

export const showTooltip: Plugin<"line"> = {
  id: "showTooltip",
  afterDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();

    const { x, y } =
      chart.getDatasetMeta(0).data.length === 110
        ? chart.getDatasetMeta(0).data[89]
        : { x: 0, y: 0 };

    const widthTooltip = 110;
    const heightTooltip = 30;
    const marginX = x + 10;

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
    ctx.fillText("LIVE PRICE", marginX + widthTooltip / 2, y - 8);
    ctx.restore();

    // text
    ctx.font = "12px Unbounded";
    if (options.startPrice !== 0) {
      ctx.fillStyle =
        options.label > options.startPrice
          ? "rgb(145, 255, 93)"
          : "rgb(255, 50, 50)";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.textAlign = "center";
    ctx.fillText(
      "$ " + new Intl.NumberFormat("en").format(options.label),
      marginX + widthTooltip / 2,
      y + 10
    );
    ctx.restore();
  },
};
