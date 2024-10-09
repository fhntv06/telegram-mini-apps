import classNames from 'classnames/bind'
import styles from './Person.module.scss'

const cx = classNames.bind(styles)

interface Props {
	className?: string,
	img: string
}

export const Person = ({
	className,
	img
}: Props) => {
  return (
		<div className={cx('person', className)}>
			<img className={cx('person__img')} src={img}  alt={img}/>
		</div>
  )
}