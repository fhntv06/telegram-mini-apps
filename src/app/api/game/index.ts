import { post } from '../core';
import { url } from '../config'

export const getPriceHistory = (data = {}) => post(`${url}/api/btc/array`, data);
