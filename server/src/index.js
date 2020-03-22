const express = require("express");
const fs = require("fs");
const path = require("path");
const youtubedl = require("youtube-dl");
const cors = require('cors');

const app = express();

app.use(cors())

app.get("/", (req, res) => {
  
});

app.get("/:yube", (req, res) => {
  const id = req.query.v;
  const url = `https://www.youtube.com/watch?v=${id}`;
  const yube = youtubedl(url);
  yube.pipe(fs.createWriteStream(`${id}.mp4`));
  yube.on("end", () => {
    res.download(path.join(`${id}.mp4`));
  });
});

app.get("/info/:videoId", async (req, res) => {
  const url = `https://www.youtube.com/watch?v=${req.params.videoId}`;
  youtubedl.getInfo(url, async (err, info) => {
    if (err) throw err;
    return res.json(info);
  });
});

app.listen(3000);
