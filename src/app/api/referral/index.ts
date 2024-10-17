import { post } from '../core'

// This endpoint registers a referral player by receiving their Telegram ID, wallet address, and referral code.
export const postReferral = (data = {}) => post('/api/players/referral', data)

