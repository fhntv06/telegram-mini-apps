import { get } from '../core'

// Get balance in nano TON
export const getBalance = (address: string) => get(`/api/getBalance/${address}`)

// Get wallet bet in nano TON
export const getWalletBet = (address: string) => get(`/api/getWalletBet/${address}`)
