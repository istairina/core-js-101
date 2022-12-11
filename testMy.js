function retry(func, attempts) {
  console.log(`attemp ${attempts}`);
  let att = attempts;
  return () => {
    while (att > 0) {
      console.log(att);
      let errStatus = false;
      try {
        console.log('try');
        func();
      } catch (err) {
        console.log('error');
        errStatus = true;
        att -= 1;
      }
      if (errStatus === false) {
        att = 0;
      }
    }
    return func;
  };
}



const attempt = 0, retryer = retry(() => {
  if (++attempt % 2) throw new Error('test');
  else return attempt;
  }, 2);
  console.log(retryer());