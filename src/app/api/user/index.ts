import { get } from '../core'

// Get balance in nano TON
export const getBalance = (address: string) => get(`/api/getBalance/${address}`)
