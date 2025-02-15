const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data folder created!");
}

const filePath = path.join(dataFolder, "example.txt");
//sync way of creating the file
fs.writeFileSync(filePath, "Hello fron node js");
console.log("File created sucessfully!");

const readConetentFromFile = fs.readFileSync(filePath, "utf8");
console.log("Read content from file:", readConetentFromFile);

fs.appendFileSync(filePath, "\nThis is a new line added to that file.");
console.log("New file content added!");

//async way of creating the file
const asyncFilePath = path.join(dataFolder, "async-example.txt");
fs.writeFile(asyncFilePath, "Hello, Async node js", (err) => {
  if (err) throw err;
  console.log("Async file is created sucessfully!");

  fs.readFile(asyncFilePath, "utf8", (error, data) => {
    if (error) throw error;
    console.log("Async file content:", data);

    fs.appendFile(asyncFilePath, "\nThis is anothe line added", (error) => {
      if (error) throw error;

      console.log("New line added async file");

      fs.readFile(asyncFilePath, "utf8", (err, updatedData) => {
        if (error) throw error;
        console.log("Updated data:", updatedData);
      });
    });
  });
});
