const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoutes");
const Url = require("./models/Url");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API routes
app.use("/api", urlRoutes);

// redirect short url
app.get("/:shortId", async (req, res) => {

  try {

    const url = await Url.findOne({ shortId: req.params.shortId });

    if (!url) {
      return res.send("URL not found");
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).send("Server error");
  }

});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});