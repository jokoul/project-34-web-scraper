const express = require("express");
const scrap = require("./scrap");
const heading = require("./heading");

//we create our server app
const app = express();

//General Middleware
app.use(express.json()); //extract JSON from the body of our request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/siteinfo", (req, res) => {
  const url = req.body.url;
  heading.getHeading(url);
});

app.post("/siteimage", (req, res) => {
  const url = req.body.url;
  scrap.scrap(url);
  res.status(200).send({ message: "success" });
});

//Define the port
const port = 3000;

//Listen entry requests
app.listen(port, () => {
  console.log(`App listen on port ${port}!`);
});
