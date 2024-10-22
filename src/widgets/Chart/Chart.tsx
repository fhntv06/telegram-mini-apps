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
import { numberLastPoint } from '../../shared/constants'
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
  const { startBtcPrice, gamePhase } = useSelector((state: any) => state.gameStatus)
	const chartRef = useRef<any>(null);

  const options: any = getOptions(
    data.datasets[0].data[numberLastPoint], // baseValue - center value
    startBtcPrice,
    gamePhase
  )

  return (
    <Line
      ref={chartRef}
      className='z-10'
      options={options}
      plugins={[showTooltip, startTooltip]}
      data={data}
    />
  )
}

export const Chart = () => {
  const { chartData } = useChartData();

	return (
    chartData && (
      <div className={cx('chart')}>
        <ChartPanel/>
        <LineChart data={chartData} />
      </div>
    )
  )
}