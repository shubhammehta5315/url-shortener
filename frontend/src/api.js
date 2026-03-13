import axios from "axios";

export const shortenUrl = (url) =>
  axios.post("http://localhost:5000/api/shorten", { originalUrl: url });

export const getUrls = () =>
  axios.get("http://localhost:5000/api/urls/all");