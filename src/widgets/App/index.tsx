import WebApp from '@twa-dev/sdk'
import { type FC, useEffect } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { routes } from '../../app/routes/routes'

function BackButtonManipulator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onClick() {
      navigate(-1)
    }
    WebApp.BackButton.onClick(onClick)

    return () => WebApp.BackButton.offClick(onClick)
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      WebApp.BackButton.isVisible && WebApp.BackButton.hide()
    } else {
      !WebApp.BackButton.isVisible && WebApp.BackButton.show()
    }
  }, [location])

  return null;
}

export const App: FC = () => (
  <BrowserRouter>
    <BackButtonManipulator/>
    <Routes>
      {routes.map((route) => <Route key={route.path} {...route} />)}
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  </BrowserRouter>
);
