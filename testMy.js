function isString(value) {
    //console.log(typeof value);


   return ((typeof value === 'string' || value instanceof String) ? true : false);
}

console.log(isString()); //=> false
console.log(isString(null)); //=> false
console.log(isString([])); //=> false
console.log(isString({})); //=> false
console.log(isString('test')); //=> true
console.log(isString(new String('test'))); //=> true