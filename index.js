const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("layout", { result: null });
});

app.post("/download", async (req, res) => {
  const url = req.body.url;
  if (!url || !url.includes("tiktok.com")) {
    return res.render("layout", { result: { error: "Link tidak valid" } });
  }

  try {
    const api = `https://api.lolhuman.xyz/api/tiktok?apikey=GataDios&url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api);
    res.render("layout", {
      result: {
        video: data.result.link,
        thumb: data.result.thumbnail,
        desc: data.result.caption
      }
    });
  } catch (e) {
    res.render("layout", { result: { error: "Gagal ambil video." } });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TikTok Downloader running on http://localhost:${PORT}`);
});