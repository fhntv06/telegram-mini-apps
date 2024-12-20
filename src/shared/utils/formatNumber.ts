const checker = (
  number: number | string,
  callback: () => number | string
): string => {
  let res: number | string = 0;

  if (number || number === 0) {
    res = callback()
  } else throw new Error(`formatNumber func , number is ${number}, typeof: ${typeof number}`);

  return res.toString()
}

export const formatNumber = (number: number | string): string => (
  checker(
    number,
    () => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  )
)
export const formatIntTonNumber = (number: number | string): string => (
  checker(
    number,
    () => Number(number) / 1000000000
  )
)
export const roundToFixed = (number: number | string, fixed: number = 2): string => (
  checker(
    number,
    () => Number(number).toFixed(fixed)
  )
)
export const getCorrectBalance = (number: number | string) => (
  checker(
    number,
    () => roundToFixed(formatIntTonNumber(number))
  )
)
export const getCorrectBalanceWithFormatNumber = (number: number | string, fixed?: number) => (
  checker(
    number,
    () => formatNumber(roundToFixed(formatIntTonNumber(number), fixed))
  )
)
