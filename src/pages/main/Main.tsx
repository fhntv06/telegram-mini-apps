import { NavLink } from 'react-router-dom'
import { Button } from '../../shared/ui'

export const Main = () => {
    return (
      <div>
        <h1>Vite + React</h1>
        <ul>
          <li>
            <NavLink to='/ton-connect' >To Ton Connect -&gt;</NavLink>
          </li>
          <li>
            <NavLink to='/ui' >To UI page -&gt;</NavLink>
          </li>
        </ul>
        
        <Button active>Example button active component</Button>
      </div>
    )
}