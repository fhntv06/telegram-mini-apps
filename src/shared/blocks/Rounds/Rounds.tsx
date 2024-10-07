import classNames from 'classnames/bind'
import styles from './Rounds.module.scss'
import { Icon } from '../../ui'
import { IRounds } from './types'

const cx = classNames.bind(styles)

const countTypeClasses = [
	{
		nameIcon: 'arrow-up',
		className: 'up'
	},
	{
		nameIcon: 'arrow-down',
		className: 'down'
	},
	{
		nameIcon: 'arrow-refund',
		className: 'refund'
	}
]

export const Rounds = ({ countType }: IRounds) => {
	return (
		<div className={cx('rounds', countTypeClasses[countType].className)}>
			<Icon name={countTypeClasses[countType].nameIcon} size='small' />
		</div>
	)
}