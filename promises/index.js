function delayFn(time) {
  return new Promise((resolve) => {
    return setTimeout(resolve, time);
  });
}

console.log("Promise start");
delayFn(2000).then(() => console.log("After 2 seconds promise resolve."));
console.log("End");

function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Cannot perform division by 0");
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFn(10, 0)
  .then((result) => {
    return console.log(result);
  })
  .catch((err) => console.log("Error ", err));
