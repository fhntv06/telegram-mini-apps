import { get } from '../core';

// Returns the current address of the pool smart contract.
export const getAddressContract = () => get('/api/pool/address')