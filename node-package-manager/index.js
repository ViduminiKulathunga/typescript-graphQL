const lodash = require("lodash");

const names = ["Vidumini", "amila", "kulathunga"];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
