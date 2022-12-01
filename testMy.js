function timeSpanToString(startDate) {
  let difference = 20000;
  let ms = 0;
  let sec = 0;
  let min = 0;
  let hour = 0;
  let res;
  if (!(difference % 1000)) {
    res = '.000';
  } else {
    ms = (difference % 1000);
    switch (true) {
      case (ms < 10):
        res = '.00' + ms;
        break;
      case (ms < 100):
        res = '.0' + ms;
        break;
      default:
        break;
    }
  }

  function convert(item, number) {
    if (!(item % number || item === 0)) {
      res = ':00' + res;
    } else {
      item = item % number;
      if (item < 10) {
        res = ':0' + item + res;
      } else {
        res = ':' + item + res;
      }
    }
  }

  sec = Math.trunc(difference/1000);
  convert(sec, 60);
  min = Math.trunc(sec/60);
  convert(min, 60);
  hour = Math.trunc(min/60);
  convert(hour, 24);
  return res.slice(1);
}

console.log(timeSpanToString(Date(2000,1,1,10,0,0)));

