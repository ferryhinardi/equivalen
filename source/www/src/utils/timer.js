// @flow
export const secondsToTime = (secs: number): {h: string, m: string, s: string} => {
  const hours = Math.floor(secs / (60 * 60));
  const hourText = `0${hours}`.slice(-2);

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);
  const minuteText = `0${minutes}`.slice(-2);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  const secondText = `0${seconds}`.slice(-2);

  const obj = {
    h: hourText,
    m: minuteText,
    s: secondText,
  };
  return obj;
};
