const cheerio = require("cheerio");
const axios = require("axios");

function getHeading(url) {
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
    })
    .catch((err) => console.log(err));
}

module.exports = { getHeading };
