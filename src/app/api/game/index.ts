import { get } from '../core'

// Returns the current address of the pool smart contract.
export const getAddressContract = () => get('/api/pool/address')

// Returns the game results including the winning and losing pool data.
export const getGameBetsResult = (query: string) => get(`/api/game/getGameBetsResult?${query}`)

// This endpoint retrieves the top players based on their reward points.
export const getLeaderboard = () => get('/api/leaderboard')

// Retrieve all tasks and hints for the user after verifying the signature and hash.
export const getTasks = (initData: string) => get(`/api/getTasks/${initData}`)
