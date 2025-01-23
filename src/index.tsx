import { createRoot } from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import { Root } from './widgets'
import './shared/assets/styles/global.scss'

WebApp.ready();

createRoot(document.getElementById('root')!).render(<Root />)
