function distinct(arr) {
  return Array.from(new Set(arr));
}


console.log(distinct([ 1, 2, 3, 3, 2, 1 ]));