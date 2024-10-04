import { useContext, useRef, useEffect } from 'react';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
	backgroundSplitPlugin,
	getOptions,
	showTooltip,
	startTooltip,
	// Info
} from './utils';
import { useChartData } from '../../hooks';

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

export const Chart = () => {
	const chartRef = useRef<any>(null);
  const { chartData, lockValue, lastPrice, updateData } = useChartData();

  const options = getOptions(
    lockValue,
    chartData.datasets[0].data[89],
    0
  );

  useEffect(updateData, [lastPrice]);

	return (
		<div className={cx('chart')}>
			{/* <Info /> */}
      <Line
        ref={chartRef}
        className='z-10'
        options={options}
        plugins={[showTooltip, startTooltip]}
        data={chartData}
      />
		</div>
	)
}