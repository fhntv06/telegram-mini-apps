import { useState } from 'react'
import WebApp from '@twa-dev/sdk'
import reactLogo from '../../shared/assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink } from 'react-router-dom'
import clns from 'classnames/bind'
import { Button } from '../../shared/ui'

import styles from './Main.module.scss'

const cx = clns.bind(styles);

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