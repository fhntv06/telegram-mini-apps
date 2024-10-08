import { get } from '../core'

// Fetch players data using a specific method (0 for get_down_bets_dict, 1 for get_up_bets_dict).
export const getPlayersBets = (method: 0 | 1) => get(`/api/players/${method}`)
