const fs = require("fs");
const path = require("path");

const page1 = require("../data/page1.json");
const page2 = require("../data/page2.json");
const page3 = require("../data/page3.json");
const page4 = require("../data/page4.json");
const page5 = require("../data/page5.json");
const page6 = require("../data/page6.json");

const sources = [page1, page2, page3, page4, page5, page6];

const images = sources.reduce((acc, page) => {
  const arr = page.results.reduce((acc, { original_title, poster_path }) => {
    return poster_path ? [...acc, [original_title, poster_path]] : acc;
  }, []);

  return [...acc, ...arr];
}, []);

const json = JSON.stringify(images, null, 2);
const file = path.resolve(__dirname, "../src/img") + "/images.json";

fs.writeFile(file, json, "utf8", (err, data) => {
  if (err) return console.error(err);

  console.log(data);
});
