// module.exports -> export
// require -> import

const firstModule = require("./module-first");

console.log(firstModule.add(10, 20));

try {
  console.log("Trying to divide by zero");
  let result = firstModule.divide(100, 10);
  console.log(result);
} catch (error) {
  console.log("Caught an error ", error);
}

// //module wrapper
// (function (exports, require, module, __filename, __dirname) {
//   // module code goes here
// });
