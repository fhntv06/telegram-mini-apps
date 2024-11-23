import { get, post } from '../core'

// Get balance in nano TON
export const getBalance = (address: string) => get(`/api/getBalance/${address}`)

// Get balance in nano TON
export const getDemoBalance = (telegramId: number) => get(`/api/getDemoBalance/${telegramId}`)

// Get wallet bet in nano TON
export const getWalletBet = (data = {}) => post('/api/getWalletBet', data)

// This endpoint records a player's bet details, including their Telegram user image, wallet address, bet amount, and bet status.
export const postDataBetDetailsPlayers = (data = {}) => post('/api/players/bet', data)
