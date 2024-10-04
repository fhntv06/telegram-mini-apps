import classNames from 'classnames/bind'
import styles from './Person.module.scss'

import { IPerson } from './types'

const cx = classNames.bind(styles)

interface Props {
	className?: string,
	data: IPerson
}

export const Person = ({
	className,
	data
}: Props) => {
	const { name, img } = data

  return (
		<div className={cx('person', className)}>
			<img className={cx('person__img')} src={img} alt={name} />
		</div>
  )
}