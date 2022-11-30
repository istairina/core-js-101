function swapHeadAndTail(arr) {
  const arrLength = arr.length;
  const arrHalfLength = Math.trunc(arrLength / 2);
  let second = [];
  let first = [];
  let middle;
  let result;

  first = arr.slice(0, arrHalfLength);
  second = arr.slice(-arrHalfLength);
  if ((arrLength % 2)) {
    middle = arr.slice(arrHalfLength, arrHalfLength + 1);
    result = second.concat(middle).concat(first);
  } else {
    result = second.concat(first);
  }
  return result;
}




console.log(swapHeadAndTail([ 1]));