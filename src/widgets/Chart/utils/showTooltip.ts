import { type Plugin } from "chart.js";

export const showTooltip: Plugin<"line"> = {
  id: "showTooltip",
  afterDraw: (chart, _args, options) => {
    const { ctx } = chart;
    ctx.save();

    const { x, y } =
      chart.getDatasetMeta(0).data.length === 110
        ? chart.getDatasetMeta(0).data[89]
        : { x: 0, y: 0 };

    const widthTooltip = 83;
    const heightTooltip = 24;
    const marginX = x + 5;
    let colorText = '#fff'

    if (options.gamePhase === 3) {
      colorText = options.btcPrice > options.startPrice ? '#28DA64' : '#FD2D39'
    }

    // container
    ctx.fillStyle = "#FFFFFF14";
    ctx.beginPath();
    ctx.roundRect(marginX, y - 8, widthTooltip, heightTooltip, 8);
    ctx.fill();
    ctx.restore();

    // text
    ctx.font = "14px Inter";
    ctx.fillStyle = colorText;

    ctx.textAlign = "center";
    ctx.fillText(
      Number(options.btcPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.'),
      marginX + widthTooltip / 2,
      y + 10
    );
    ctx.restore();
  },
};
