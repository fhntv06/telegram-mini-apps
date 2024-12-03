import { get, post } from '../core';
import { string } from 'prop-types'

// Returns the current address of the pool smart contract.
export const getAddressContract = () => get('/api/pool/address')

// Returns the game results including the winning and losing pool data.
export const getGameBetsResult = (data = { ticker: string, gameMode: string }) => post('/api/game/getGameBetsResult', data)
