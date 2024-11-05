import { useEffect } from 'react'
import classNames from 'classnames/bind'
import { IPerson } from './types'
import styles from './Person.module.scss'
import { AnimationBlock } from '../../../widgets'
import { useAnimation } from '../../../hooks'

const cx = classNames.bind(styles)

interface Props {
	className?: string,
	data: IPerson
}

export const Person = ({
	className,
	data,
}: Props) => {
	const { img, is_pending } = data
	const { type, openHandler, closeHandler } = useAnimation()

	useEffect(() => {
		if (is_pending) openHandler('loadPerson')
		else closeHandler()
	}, [is_pending]);

  return (
		<div className={cx('person', className)}>
			<AnimationBlock animation={type} />
			<img className={cx('person__img')} src={img} alt={img}/>
		</div>
	)
}