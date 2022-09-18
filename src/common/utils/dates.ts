const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tueday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/** ex "Due 8/07/21 at 15:00" */
export function getTaskCardDateString(date: Date): string {
  let taskCardDateString = 'Due: ' + getLogicalDateString(date);
  taskCardDateString += ' at ' + getTimeString(date);
  return taskCardDateString;
}

/**
 * Returns a relevant string depending on the value of 'date', from several possible values below.
 * @returns ["Today", "Tomorrow", "Weekday, Day Month", "dd/MM/YY"]
 */
function getLogicalDateString(date: Date): string {
  const currentDate = new Date();
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Today';
  } else if (
    date.getDate() === currentDate.getDate() + 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Tomorrow';
    // if the asbolute day of the month diff <= 7 and month and year are equal
  } else if (
    Math.abs(date.getDate() - currentDate.getDate()) <= 7 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return getDayDateString(date);
  }
  return getShortDateString(date);
}

/** ex. 8/07/21 */
function getShortDateString(date: Date): string {
  const month =
    date.getMonth() < 9
      ? '0' + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString();
  const dateString =
    date.getDate().toString() +
    '/' +
    month +
    '/' +
    date.getFullYear().toString().slice(2);
  return dateString;
}

/**
 * ex. "Thursday, 7th July"
 */
function getDayDateString(date: Date): string {
  const dateString =
    getWeekdayString(date.getDay()) +
    ', ' +
    getOrdinalDayString(date.getDate()) +
    ' ' +
    getMonthString(date.getMonth());
  return dateString;
}

/**
 * @returns the name of the weekday associated with a given number.
 * @example getWeekDayString(0) => { return "Monday" }
 */
function getWeekdayString(day: number): string {
  return WEEKDAYS[day];
}

/**
 * @returns a string containing day + the appropriate ordinal indicator.
 * @example getOrdinalDayString(1) => return { "1st" };
 *          getOrdinalDayString(22) => return { "22nd" };
 */
function getOrdinalDayString(day: number): string {
  switch (true) {
    case day === 1 || day === 21 || day === 31:
      return day.toString() + 'st';
    case day === 2 || day === 22:
      return day.toString() + 'nd';
    case day === 3 || day == 23:
      return day.toString() + 'rd';
    default:
      return day.toString() + 'th';
  }
}

/**
 * @returns the name of the month associated with a given number.
 * @example getMonthString(0) => { return "January" }
 */
export function getMonthString(month: number): string {
  return MONTHS[month];
}

/**
 * @returns a string formatted as 'HH:MM' based on the given Date.
 */
function getTimeString(date: Date): string {
  let hoursString = date.getHours().toString();
  if (date.getHours() < 10) {
    hoursString = '0' + hoursString.toString();
  }
  let minutesString = date.getMinutes().toString();
  if (date.getMinutes() < 10) {
    minutesString = '0' + minutesString.toString();
  }
  return hoursString + ':' + minutesString;
}
