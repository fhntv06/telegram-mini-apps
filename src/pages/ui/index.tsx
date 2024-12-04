import { NavLink } from 'react-router-dom'
import { Button } from '../../shared'

export const UI = () => {
	return (
		<div>
			<NavLink to='/' >To Main page -&gt;</NavLink>
			<Button active>Button 1</Button>
		</div>
	)
}
