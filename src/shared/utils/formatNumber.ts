export const formatNumber = (number: number | string) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
export const formatIntTonNumber = (number: number) => number / 1000000000
export const convertNumberInTon = (number: number) => formatNumber(formatIntTonNumber(number))