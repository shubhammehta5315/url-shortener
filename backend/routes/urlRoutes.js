const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  const shortId = shortid.generate();

  const newUrl = new Url({
    originalUrl,
    shortId
  });

  await newUrl.save();

  res.json({
    shortUrl: `http://localhost:5000/${shortId}`
  });
});

router.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });

  if (url) {
    return res.redirect(url.originalUrl);
  }

  res.status(404).send("Not found");
});

router.get("/urls/all", async (req, res) => {
  const urls = await Url.find();
  res.json(urls);
});

module.exports = router;