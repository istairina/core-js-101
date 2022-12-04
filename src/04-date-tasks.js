/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const year = new Date(date).getFullYear();
  let res;
  if ((year % 4)) {
    res = false;
  } else if ((year % 100)) {
    res = true;
  } else if ((year % 400)) {
    res = false;
  } else res = true;
  return res;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  // const difference = Date.parse(endDate) - Date.parse(startDate);
  const difference = endDate - startDate;
  let ms = 0;
  let sec = 0;
  let min = 0;
  let hour = 0;
  let res;
  if (!(difference % 1000) || difference === 0) {
    res = '.000';
  } else {
    ms = (difference % 1000);
    switch (true) {
      case (ms < 10):
        res = `.00'${ms}`;
        break;
      case (ms < 100):
        res = `.0${ms}`;
        break;
      default:
        res = `.${ms}`;
        break;
    }
  }

  function convert(item, number) {
    let timeName = item;
    if (!(timeName % number) || timeName === 0) {
      res = `:00${res}`;
    } else {
      timeName %= number;
      if (item < 10) {
        res = `:0${timeName}${res}`;
      } else {
        res = `:${timeName}${res}`;
      }
    }
  }

  sec = Math.trunc(difference / 1000);
  convert(sec, 60);
  min = Math.trunc(sec / 60);
  convert(min, 60);
  hour = Math.trunc(min / 60);
  convert(hour, 24);
  return res.slice(1);
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const hour = date.getUTCHours() % 12;
  const minute = date.getMinutes();
  const hourhandPerMinute = 0.5 * minute;
  const hourhandPerHour = 30 * hour;
  const minutehandPerMinute = 6 * minute;
  let degree = Math.abs(hourhandPerMinute + hourhandPerHour - minutehandPerMinute);
  if (degree > 180) {
    degree %= 180;
  }
  const pi180 = Math.PI / 180;
  return degree * pi180;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
