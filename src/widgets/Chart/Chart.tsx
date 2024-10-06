import { useRef, useEffect, useContext, useState } from 'react';
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
import { PriceHistoryContext, GameStatusContext } from '../../app/contexts'
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
  lockValue: number | null;
}

const LineChart = ({ data, lockValue }: ILineChartProps) => {
	const chartRef = useRef<any>(null);

  const options: any = getOptions(
    lockValue, // baseValue - center value
    data.datasets[0].data[89],
    0
  );

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
  const priceHistory = useContext<any>(PriceHistoryContext) // из store
  const gameStatus = useContext<any>(GameStatusContext) // из store

  const {
    chartData,
    lockValue,
    lastPrice,
    updateData
  } = useChartData(priceHistory, gameStatus);

	return (
		<div className={cx('chart')}>
      <ChartPanel />
      <LineChart data={chartData} lockValue={lockValue} />
    </div>
	)
}