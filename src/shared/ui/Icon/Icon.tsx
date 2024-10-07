import { type IconType, type IconNames } from './types';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  name: IconNames | string;
  size?: IconType,
}

enum ESize {
  small =12,
  medium = 16,
  big = 24
}

export const Icon = ({
  className,
  name,
  size = 'medium'
}: Props) => {
  return (
    <span className={cx('icon', className)}>
      <svg role='image' className={cx(size)} width={ESize[size]} height={ESize[size]} viewBox={`0 0 ${ESize[size]} ${ESize[size]}`}>
        <use xlinkHref={`/images/icons.svg#${name}`} />
      </svg>
    </span>
  );
}
