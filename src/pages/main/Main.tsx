import { useState } from 'react'
import reactLogo from '../../shared/assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink } from 'react-router-dom'
import clns from 'classnames/bind'
import { Button } from '../../shared/ui'

import styles from './Main.module.scss'

import WebApp from '@twa-dev/sdk'

const cx = clns.bind(styles);

export const Main = () => {
  const [count, setCount] = useState(0);

    return (
      <div>
        <div>
          <NavLink to='/telegram-mini-apps/ui' >To UI page -&gt;</NavLink>
          <a href='https://vitejs.dev' target='_blank'>
            <img src={viteLogo} className={cx('logo', 'vite')} alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className={cx('logo', 'react')} alt='React logo' />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className={cx('card')}>
          <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
          </button>
        </div>
          {/* Here we add our button with alert callback */}
        <div className={cx('card')}>
          <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert (test workflows)
          </button>
  
          <Button active>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      </div>
    )
}