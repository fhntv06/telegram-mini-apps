export const formatNumber = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
export const formatIntTonNumber = (number: number) => number / 1000000000