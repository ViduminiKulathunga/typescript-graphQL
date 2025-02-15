const path = require("path");

console.log("Directory name:", path.dirname(__filename));

console.log("File name:", path.basename(__filename));

console.log("File extension:", path.extname(__filename));

const jointPath = path.join("/user", "documents", "node", "projects");
console.log("Joint path:", jointPath);

const resolvePath = path.resolve("user", "documents", "node", "project");
console.log("Resolve path:", resolvePath);

const normalizedPath = path.normalize("/user/.documents/../node/projects");
console.log("Normalized path:", normalizedPath);
