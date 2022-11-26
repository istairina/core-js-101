function isPrime(n) {
    let result;
    for (let i = 2; i < n; i += 1) {
        if (!(n % i)) {
            console.log(`${n} divided to ${i}`);
            result = true;
            console.log(i);
            break;
        }
    }
    return (result = (result) ? false : true);
  }




console.log(isPrime(4));
console.log(isPrime(5));
console.log(isPrime(6));
console.log(isPrime(7));


