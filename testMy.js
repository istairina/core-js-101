function isCreditCardNumber(ccn) {
  const arrCcn = String(ccn).split('').reverse();
  const newArr = arrCcn.map((elem, i) => {
    let newElem = elem;
    if ((i % 2) !== 0) {
      newElem *= 2;
      if (newElem > 9) {
        const arrElem = String(newElem).split('');
        newElem = Number(arrElem[0]) + Number(arrElem[1]);
      }
    }
    return newElem;
  });
  const sum = newArr.reduce((sum, elem) => sum + Number(elem), 0);
  return !(sum % 10);
}

console.log(isCreditCardNumber(79927398713));
console.log(isCreditCardNumber(4571234567890111));