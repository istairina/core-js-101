function doubleArray(arr) {
    const resLength = arr.length * 2;
    //let result = Array(resLength).fill('');
    //result = arr.slice();
    //result += arr.slice();
    const result = arr.concat(arr);
    return result;
  }


console.log(doubleArray(['Ace', 10, true]));
