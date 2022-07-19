const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const scrap = require("./scrap");

//we create our server app
const app = express();

//General Middleware
app.use(express.json()); //extract JSON from the body of our request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/siteinfo", async (req, res) => {
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
      scrap.scrap(url);
      console.log(articles);
      res.send(articles);
    })
    .catch((err) => console.log(err));
});

//Define the port
const port = 3000;

//Listen entry requests
app.listen(port, () => {
  console.log(`App listen on port ${port}!`);
});
