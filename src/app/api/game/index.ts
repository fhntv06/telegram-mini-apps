import { get } from '../core'

// Returns the current address of the pool smart contract.
export const getAddressContract = () => get('/api/pool/address')

// Returns the game results including the winning and losing pool data.
export const getGameBetsResult = (query: string) => get(`/api/game/getGameBetsResult?${query}`)
