const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("URL Shortener API is running 🚀");
});

app.use("/api", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});