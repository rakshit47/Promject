const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, console.log(`Listening at PORT ${PORT}...`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index3.html");
});
