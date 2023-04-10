export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export const numToHHMMSS = function (num: number) {
  let sec_num = parseInt(num.toString(), 10);
  let hours: string | number = Math.floor(sec_num / 3600);
  let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: string | number = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};
