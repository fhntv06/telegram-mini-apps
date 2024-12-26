const checker = (
  number: number | string,
  callback: () => number | string
): string => {
  let res: number | string = 0;

  if (number || number === 0) {
    res = callback()
  } else throw new Error(`checker func , number is ${number}, typeof: ${typeof number}`);

  return res.toString()
}

export const formatNumber = (number: number | string = 0): string => (
  checker(
    number,
    () => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  )
)
export const formatIntTonNumber = (number: number | string = 0): string => (
  checker(
    number,
    () => Number(number) / 1000000000
  )
)
export const roundToFixed = (number: number | string = 0, fixed: number = 2): string => (
  checker(
    number,
    () => Number(number).toFixed(fixed)
  )
)
export const getCorrectBalance = (number: number | string = 0) => (
  checker(
    number,
    () => roundToFixed(formatIntTonNumber(number))
  )
)
export const getCorrectBalanceWithFormatNumber = (number: number | string = 0, fixed?: number) => (
  checker(
    number,
    () => formatNumber(roundToFixed(formatIntTonNumber(number), fixed))
  )
)
