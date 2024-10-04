import classNames from 'classnames/bind'
import styles from './Rounds.module.scss'
import { Icon } from '../../ui'
import { IRounds } from './types'

const cx = classNames.bind(styles)

export const Rounds = ({ status = false }: IRounds) => {
	return (
		<div className={cx('rounds', { 'active': status })}>
			<Icon name={status ? 'arrow-up' : 'arrow-down'} size='small' />
		</div>
	)
}