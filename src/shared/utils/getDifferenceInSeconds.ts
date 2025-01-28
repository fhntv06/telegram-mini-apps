export const differenceInSeconds = (timestamp: number) => {
  const diffTime = -Math.floor((Date.now() - timestamp) / 1000)

  return (diffTime === 0 || diffTime < 0)
    ? '00:10'
    : diffTime < 10
      ? `00:0${diffTime}`
      : `00:${diffTime}`
}
