import classNames from 'classnames/bind'
import { IPerson } from './types'
import styles from './Person.module.scss'

const cx = classNames.bind(styles)

interface Props {
	className?: string,
	data: IPerson
}

export const Person = ({
	className,
	data,
}: Props) => {
  return (
		<div className={cx('person', className)}>
			{data.isPending ? 'test' : <img className={cx('person__img')} src={data.img}  alt={data.img} />}
		</div>
  )
}