import { get } from '../core'

// Get balance in nano TON
export const getBalance = (address: string) => get(`/api/getBalance/${address}`)

// Returns the current address of the pool smart contract.
export const getAddressContract = () => get('/api/pool/address')
