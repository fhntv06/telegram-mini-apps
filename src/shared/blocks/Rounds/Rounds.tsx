import classNames from 'classnames/bind'
import styles from './Rounds.module.scss'
import { Icon } from '../../ui'
import { IRounds } from './types'

const cx = classNames.bind(styles)

const countTypeClasses = [
	{
		nameIcon: 'arrow-down-medium',
		className: 'down'
	},
	{
		nameIcon: 'arrow-up-medium',
		className: 'up'
	},
	{
		nameIcon: 'refund-medium',
		className: 'refund'
	}
]

export const Rounds = ({ countType }: IRounds) => {
	return (
		<div className={cx('rounds', countTypeClasses[countType].className)}>
			<Icon name={countTypeClasses[countType].nameIcon} size='medium' />
		</div>
	)
}