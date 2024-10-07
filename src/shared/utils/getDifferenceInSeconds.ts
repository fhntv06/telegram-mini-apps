// export const differenceInSeconds = (timestamp: number) => (timestamp - Date.now()) / 1000;
export const differenceInSeconds = (sec: number) => {
  const secStr = sec < 10 ? `0${sec}` : sec > 30 ? `+30` : `${sec}`;
  return `${secStr}:00`;
};