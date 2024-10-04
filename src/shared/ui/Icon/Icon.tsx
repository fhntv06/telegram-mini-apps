import { type IconType, type IconNames } from './types';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  name: IconNames;
  size?: IconType,
}

export const Icon = ({
  className,
  name,
  size = 'medium'
}: Props) => {
  return (
    <span className={cx('icon', className)}>
      <svg role='image' className={cx(size)}>
        <use xlinkHref={`/images/icons.svg#${name}`} />
      </svg>
    </span>
  );
}
