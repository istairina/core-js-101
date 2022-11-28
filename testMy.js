function toCsvText(arr) {
  return arr.reduce((str, currrent) => {
    //let str = accumul;
    if (arr.indexOf(currrent) === 0) {
      str += currrent.join(',');
      str += '\n';
    } else if (arr.indexOf(currrent) === (arr.length - 1)) {
      str = `${str}++${currrent.join(',')}`;
    } else {
      str = `${str}++${currrent.join(',')}\n`;
    }
    return str;
  }, '');
}