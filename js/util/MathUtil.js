/* eslint-disable prettier/prettier */

// 工具函数
/**
 * 格式化日期：'YYYY-MM-DD'
 * @param {Date} date 日期对象
 */
export function getYMD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  let day = date.getDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
}

export function getHM(date) {
  let hours = date.getHours();
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  let minutes = date.getMinutes();
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return hours + '时' + minutes + '分';
}

export function caculateTime(begin, end) {
  const level1 = Math.abs(
    (begin.getTime() - end.getTime()) % (1000 * 60 * 60 * 24),
  );
  const level2 = level1 % (3600 * 1000);
  const hour = Math.floor(level1 / 3600 / 1000);
  const minutes = Math.floor(level2 / 1000 / 60);
  return hour + '时' + minutes + '分';
}

export function getHundred(num) {
  return num.toFixed(2) * 100 + '%';
}
