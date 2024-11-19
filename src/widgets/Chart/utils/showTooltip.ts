import { type Plugin } from "chart.js"
import { numberLastPoint } from '../../../shared/constants'

const offsetDashedLine = [32, 100]
// Dashed line
const createDashLine = (
  ctx: CanvasRenderingContext2D,
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

export const showTooltip: Plugin<"line"> = {
  id: "showTooltip",
  afterDraw: (chart, _args, options) => {
    const { ctx } = chart
    const chartArea = chart.chartArea;
    ctx.save()

    const y = chart.getDatasetMeta(0).data[numberLastPoint].y

    const widthTooltip = 83
    const heightTooltip = 24
    const marginXRight = chart.width - widthTooltip - 8
    let colorText = '#fff'

    if (options.gamePhase === 3) {
      colorText = options.btcPrice > options.startBtcPrice ? '#28DA64' : '#FD2D39'
    }

    // container
    ctx.fillStyle = "#1C1C1E94"
    ctx.beginPath()
    ctx.roundRect(marginXRight, y - 8, widthTooltip, heightTooltip, 8)
    ctx.fill()
    ctx.restore()

    // text
    ctx.font = "14px Inter"
    ctx.fillStyle = colorText

    ctx.textAlign = "center"
    ctx.fillText(
      Number(options.btcPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.'),
      marginXRight + widthTooltip / 2,
      y + 10
    )
    ctx.restore()

    // Пунктирная линия
    createDashLine(
      ctx,
      chartArea.left - offsetDashedLine[0],
      chart.scales.y.getPixelForValue(options.btcPrice),
      chartArea.right + offsetDashedLine[1],
      '#FFFFFF3D'
    )
  },
}
