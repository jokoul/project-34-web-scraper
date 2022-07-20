const express = require("express");
const scrap = require("./scrap");
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");

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
  axios(url)
    .then((response) => {
      //Get all the html code of the url site
      const html = response.data;
      //   console.log(html);
      //Get specific element in the html code
      const $ = cheerio.load(html); //create a query fn bound to html
      let articles = [];
      if ($("h1", html)) {
        $("h1", html).each(function () {
          const siteTitle = $(this)
            .text()
            .replace(/[^a-zA-Z0-9éèàêù]/gi, " ");
          articles.push({ siteTitle });
        });
      }
      if ($("h2", html)) {
        $("h2", html).each(function () {
          const siteTitle2 = $(this)
            .text()
            .replace(/[^a-zA-Z0-9éèàêù]/gi, " ");
          articles.push({ siteTitle2 });
        });
      }
      if ($("h3", html)) {
        $("h3", html).each(function () {
          const siteTitle3 = $(this)
            .text()
            .replace(/[^a-zA-Z0-9éèàêù]/gi, " ");
          articles.push({ siteTitle3 });
        });
      }

      console.log(articles);
      res.send(articles);
    })
    .catch((err) => console.log(err));
});

app.post("/siteimage", (req, res) => {
  const url = req.body.url;
  scrap.scrap(url);
  res.send({ message: "success" });
});

//Define static site folder name
app.use(express.static("client"));
//Define the middleware to serve static file
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

//Define the port
const port = process.env.PORT || 3000;

//Listen entry requests
app.listen(port, () => {
  console.log(`App listen on port ${port}!`);
});
