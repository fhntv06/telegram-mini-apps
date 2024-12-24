import { get, post } from '../core'

// Get balance in nano TON
export const getBalance = (address: string) => get(`/api/getBalance/${address}`)

// Get balance in nano TON
export const getDemoBalance = (initData: string) => get(`/api/getDemoBalance/${initData}`)

// Get wallet bet in nano TON
export const getWalletBet = (data = {}) => post('/api/getWalletBet', data)

// This endpoint records a player's bet details, including their Telegram user image, wallet address, bet amount, and bet status.
export const postDataBetDetailsPlayers = (data = {}) => post('/api/players/bet', data)

// This endpoint retrieves data about a player using their Web App initialization data.
export const getRetrievesData = (initData: string) => get(`/api/players/data/${initData}`)
