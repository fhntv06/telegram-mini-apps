export const formatNumber = (number: number | string) => {
  let res = '0';

  if (number) {
    res = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  } else new Error(`formatNumber func , number is ${number}, ${typeof number}`);

  return res
}
export const formatIntTonNumber = (number: number) => number / 1000000000
export const convertNumberInTon = (number: number) => formatNumber(formatIntTonNumber(number))