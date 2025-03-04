import { type Plugin } from 'chart.js'

const imgFlag = new Image()
const loadImgFlag = () => {
  imgFlag.src = `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/images/canvas/flag.svg`
}

export const startTooltip: Plugin<"line"> = {
  id: "startTooltip",
  afterDraw: (chart, _args, options) => {
    if (options.startBtcPrice === 0 || options.gamePhase !== 3) return

    const { ctx } = chart
    ctx.save()

    const dataset = chart.data.datasets[0].data as number[]

    const minValue = Math.min(...dataset)
    const maxValue = Math.max(...dataset)

    const procent = (options.startBtcPrice - minValue) / (maxValue - minValue)
    const minValueY = chart.scales.y.getPixelForValue(minValue)
    const maxValueY = chart.scales.y.getPixelForValue(maxValue)

    const y = minValueY - procent * (minValueY - maxValueY)

    const widthTooltip = 96
    const heightTooltip = 24

    // 16 - offset padding left container, 64 - offset margin left container
    const marginXScreen = 16 + 64
    const marginXFlag = marginXScreen + 4
    const marginXText = marginXFlag + 4

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
      marginXText + widthTooltip / 2,
      y + 4
    )
    ctx.restore()

    if (!imgFlag.src) loadImgFlag()

    // icon flag
    ctx.drawImage(imgFlag, marginXFlag, y - 8)
  },
}
