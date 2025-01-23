import { get } from '../core'

// Generates and returns a payment invoice link for the specified amount. If the amount is not provided, defaults to 1.
export const createInvoice = (amount: number = 1) => get(`/api/createInvoice?amount=${amount}`)
export const getStarsBalance = (initData: string) => get(`/api/getUserBalance/${initData}`)