const puppeteer = require("puppeteer-core");
const fs = require("fs").promises;
const path = require("path");

async function scrap(url) {
  //Launch browser
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  //Create new page
  const page = await browser.newPage();
  //navigate to the url pass as parameter
  await page.goto(url, { waitUntil: "networkidle2" });
  //delete all files in the directory first
  const directory = "./client/img";
  async function cleanDirectory(directory) {
    try {
      await fs.readdir(directory).then((files) => {
        return Promise.all(
          files.map((file) => fs.unlink(`${directory}/${file}`))
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  cleanDirectory(directory);
  //Take an image of the all page visited
  await page.screenshot({ path: "client/img/pageimg.png", fullPage: true });

  await browser.close();
}

// scrap("https://fr.wikipedia.org/wiki/Coronavirus");

module.exports = { scrap };
