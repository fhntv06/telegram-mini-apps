import { useRef } from 'react';
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
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
	backgroundSplitPlugin,
	getOptions,
	showTooltip,
	startTooltip,
} from './utils';
import { useChartData } from '../../hooks';
import { ChartPanel } from '../'

import classNames from 'classnames/bind'
import styles from './Chart.module.scss'
import { useSelector } from 'react-redux';

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
  const { startBtcPrice, btcPrice, gamePhase } = useSelector((state: any) => state.gameStatus)
	const chartRef = useRef<any>(null);

  const options: any = getOptions(
    btcPrice,
    startBtcPrice,
    gamePhase
  )

  return (
    <Line
      ref={chartRef}
      className={cx('chart__line')}
      options={options}
      plugins={[showTooltip, startTooltip]}
      data={data}
    />
  )
}

export const Chart = () => {
  const chartData = useChartData()

	return (
    <div className={cx('chart')}>
      <ChartPanel/>
      <LineChart data={chartData} />
    </div>
  )
}
