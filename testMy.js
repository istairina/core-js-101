function chainPromises(array, action) {
  return new Promise((resolve, reject) => {
    const res = [];
    let done = 0;
    array.forEach((prom, i) => {
      Promise.resolve(prom)
        .then((result) => {
          res[i] = result;
          done += 1;

          if (done === array.length) {
            resolve(res);
          }
        })
        .catch((error) => reject(error));
      });
    })
  .then((total) => total.reduce(action))
  .catch((err) => { console.log(err); });
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    const p = chainPromises(promises, (a, b) => a + b);
   p.then((res) => {
     console.log(res) // => 6
    });