import WebApp from '@twa-dev/sdk'
import { type FC, useEffect } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom'
import { Provider } from 'react-redux';

import { routes } from '../../app/routes'
import store from '../../app/store'

function BackButtonManipulator() {
  useEffect(() => {
    const closeApp = () => WebApp.close()

    WebApp.expand()
    WebApp.BackButton.onClick(closeApp)

    return () => WebApp.BackButton.offClick(closeApp)
  }, []);

  return null;
}

export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <BackButtonManipulator/>
      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
