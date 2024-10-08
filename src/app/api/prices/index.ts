import { get } from '../core'

// Returns the array of BTC prices
export const getPriceHistory = () => get('/api/btc/array');
