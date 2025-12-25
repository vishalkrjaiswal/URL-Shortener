import { nanoid } from "nanoid";
import urlSchema from "../models/model.js";


export const createurl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    // If already shortened, return existing
    const exists = await urlSchema.findOne({ originalUrl: url });
    if (exists) {
      const shortUrl = `${process.env.BASE_URL || "http://localhost:5000"}/s/${exists.shortCode}`;
      return res.json({ shortUrl, shortCode: exists.shortCode });
    }

    // Create a unique shortCode (retry on rare collisions)
    const makeShortCode = nanoid(7);
    let shortCode = makeShortCode;
    let attempts = 0;
    while (await urlSchema.findOne({ shortCode }) && attempts < 5) {
      shortCode = makeShortCode;
      attempts++;
    }

    const newUrl = new urlSchema({ originalUrl: url, shortCode });
    await newUrl.save();

    const shortUrl = `${process.env.BASE_URL || "http://localhost:5000"}/s/${shortCode}`;
    return res.json({ shortUrl, shortCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const sh_url = async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await urlSchema.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).send("URL not found");
    }

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};