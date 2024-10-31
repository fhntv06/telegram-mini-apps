import classNames from 'classnames/bind'
import { IPerson } from './types'
import styles from './Person.module.scss'
import gifPreloader from '../../assets/images/preloader_players.gif'

const cx = classNames.bind(styles)

interface Props {
	className?: string,
	data: IPerson
}

export const Person = ({
	className,
	data,
}: Props) => {
	console.log('data IPerson: ', data)
  return (
	<div className={cx('person', className)}>
	  <img className={cx('person__img')} src={data.is_pending ? gifPreloader : data.img}  alt={data.img} />
	</div>
  )
}