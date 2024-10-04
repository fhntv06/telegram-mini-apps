import { createRoot } from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import { Root } from './widgets'
import './app/global.scss'

WebApp.ready();

createRoot(document.getElementById('root')!).render(<Root />)
