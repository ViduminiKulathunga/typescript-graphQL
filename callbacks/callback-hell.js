const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  const modidyfileData = data.toLocaleUpperCase();

  fs.writeFile("output.txt", modidyfileData, (error) => {
    if (error) {
      console.error("Error writting file", error);
      return;
    }

    console.log("Data written to the new file");

    fs.readFile("output.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("Error writting file", err);
        return;
      }

      console.log(data);
    });
  });
});
