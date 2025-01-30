import { useRef } from 'react'
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	ChartData, type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
//@ts-ignore
import { TypedChartComponent } from 'react-chartjs-2/types'
import {
	backgroundSplitPlugin,
	getOptions,
	showTooltip,
	startTooltip,
} from './utils';
import { useChartData, useSelector } from '../../hooks'
import { ChartPanel } from '../'

import classNames from 'classnames/bind'
import styles from './Chart.module.scss'

const cx = classNames.bind(styles)

ChartJS.register(
  backgroundSplitPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ILineChartProps {
  data: ChartData<'line'>,
}

const LineChart = ({ data }: ILineChartProps) => {
  const { startBtcPrice, btcPrice, gamePhase } = useSelector((state) => state.gameStatus)
	const chartRef = useRef<TypedChartComponent<"line">>(null);

  const options: ChartOptions = getOptions(
    btcPrice,
    startBtcPrice,
    gamePhase
  )

  return (
    <Line
      ref={chartRef}
      className={cx('chart__line')}
      //@ts-ignore
      options={options}
      plugins={[showTooltip, startTooltip]}
      data={data}
    />
  )
}

export const Chart = () => {
  const chartData = useChartData()
	const { settings: { isFullscreen } } = useSelector((state) => state.settings)

	return (
		chartData.datasets[0].data.length > 0 ? (
			<div className={cx('chart', { 'isFullscreen': isFullscreen })}>
				<ChartPanel/>
				<LineChart data={chartData}/>
			</div>
		) : (
			<h2>Don't have data for chart!</h2>
		)
	)
}
