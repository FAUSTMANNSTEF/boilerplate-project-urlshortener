require("dotenv").config();
const dns = require("dns");
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const urlDatabase = [];
const urlcounter = 1;
u;
app.post("/api/shorturl", function (req, res) {
  const original = req.body.url;

  try {
    // This will throw an error if URL format is invalid
    const urlObj = new URL(original);

    // Check if protocol is http or https
    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return res.json({ error: "invalid url" });
    }

    // Extract hostname for DNS lookup
    const hostname = urlObj.hostname;

    // Now use DNS lookup with just the hostname
    dns.lookup(hostname, (err) => {
      if (err) {
        return res.json({ error: "invalid url" });
      }
      urlDatabase[urlcounter] = original;

      res.json({
        original_url: original,
        short_url: urlCounter,
      });
      urlCounter++;
      // URL is valid, now you can save it and respond
      // Your code for saving and responding goes here
    });
  } catch (error) {
    // URL constructor throws if format is invalid
    return res.json({ error: "invalid url" });
  }
});

app.get("/api/shorturl/:shorturl", function (req, res) {
  const short_url = req.params.shorturl;
  const url = urlDatabase[short_url];

  if (url) {
    res.redirect(url);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});
