import { type Plugin } from "chart.js"

const imgFlag = new Image()
const loadImgFlag = () => {
  imgFlag.src = '/telegram-mini-apps/images/canvas/flag.svg'
}

export const startTooltip: Plugin<"line"> = {
  id: "startTooltip",
  afterDraw: (chart, _args, options) => {
    if (options.startBtcPrice === 0 || options.gamePhase !== 3) return
    
    const { ctx } = chart
    ctx.save()

    const dataset = chart.data.datasets[0].data

    const minValue = Math.min(
      ...(dataset.slice(0, dataset.length - 21) as number[])
    )
    const maxValue = Math.max(
      ...(dataset.slice(0, dataset.length - 21) as number[])
    )

    const procent = (options.startBtcPrice - minValue) / (maxValue - minValue)
    const minValueY = chart.scales.y.getPixelForValue(minValue)
    const maxValueY = chart.scales.y.getPixelForValue(maxValue)

    let y = minValueY - procent * (minValueY - maxValueY)
    y = isNaN(y) ? 0 : y

    const widthTooltip = 93
    const heightTooltip = 24
    const marginXScreen = 8
    const marginXTolltip = 4
    const marginX = marginXScreen + marginXTolltip

    // container
    ctx.fillStyle = "#1C1C1E94"
    ctx.beginPath()
    ctx.roundRect(marginXScreen, y - 12, widthTooltip, heightTooltip, 8)
    ctx.fill()
    ctx.restore()

    // text
    ctx.font = "14px Inter"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(
      Number(options.startBtcPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.'),
      marginX + marginXTolltip + widthTooltip / 2,
      y + 4
    )
    ctx.restore()

    if (!imgFlag.src) loadImgFlag()

    // icon flag
    ctx.drawImage(imgFlag, marginX, y - 8)
  },
}
