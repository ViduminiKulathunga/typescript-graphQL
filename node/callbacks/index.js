const { error } = require("console");
const fs = require("fs");

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log("Sweden");
}

person("Vidumini", address);
fs.readFile("input.txt", "utf-8", (error, data) => {
  if (error) {
    console.error("Error reading file", error);
    return;
  }
  console.log(data);
});
