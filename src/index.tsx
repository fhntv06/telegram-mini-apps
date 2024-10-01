import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import WebApp from '@twa-dev/sdk'
import { App } from './widgets'
import './index.css'

WebApp.ready();

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

createRoot(document.getElementById('root')!).render(app)
