import { BounceLoader } from 'react-spinners'
import classNames from 'classnames/bind'

import styles from './LoaderSpinner.module.scss'

const cx = classNames.bind(styles)

export const LoaderSpinner = () => (
  <BounceLoader className={cx('loader')} color="#28DA64" loading size={50} />
);
