import React, { useState, useEffect } from "react";
import { shortenUrl, getUrls } from "../api";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await shortenUrl(url);
    setShortUrl(res.data.shortUrl);

    loadUrls();
  };

  const loadUrls = async () => {
    const res = await getUrls();
    setUrls(res.data);
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert("Copied!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>{shortUrl}</p>
          <button onClick={() => copyLink(shortUrl)}>Copy</button>
        </div>
      )}

      <h3>All URLs</h3>

      {urls.map((u) => (
        <div key={u._id}>
          <p>{u.originalUrl}</p>
          <p>http://localhost:5000/{u.shortId}</p>
        </div>
      ))}
    </div>
  );
}

export default UrlForm;