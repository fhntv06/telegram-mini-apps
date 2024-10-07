import { post } from '../core'
import { url } from '../config'

export const getBalance = (data = {}) => post(`${url}/getBalance`, data)