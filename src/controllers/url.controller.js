// const nanoid = require("nanoid").nanoid;
// const URL = require("../models/url.model");
// const { client } = require("../config/redis");

// const {
//   createShortUrlService,
//   getOriginalUrlService
// } = require("../services/url.service");

// exports.createShortUrl = async (req, res) => {
//   try {
//     const { originalUrl } = req.body;

//     if (!originalUrl) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     const shortId = await createShortUrlService(originalUrl);

//     res.json({
//       shortUrl: `http://localhost:5000/${shortId}`
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createShortUrl = async (req, res) => {
//   try {
//     const { originalUrl } = req.body;
//     if (!originalUrl) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     const shortId = nanoid(6);

//     const newUrl = await URL.create({
//       shortId,
//       originalUrl
//     });

//     res.json({
//       shortUrl: `http://localhost:5000/${shortId}`
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };



// exports.redirectUrl = async (req, res) => {
//   const { shortId } = req.params;

//   // 1. Check cache
//   const cachedUrl = await client.get(shortId);

//   if (cachedUrl) {
//     return res.redirect(cachedUrl);
//   }

//   // 2. If not in cache → DB
//   const entry = await URL.findOne({ shortId });

//   if (!entry) {
//     return res.status(404).send("URL not found");
//   }

//   // 3. Store in Redis
//   await client.set(shortId, entry.originalUrl, {
//     EX: 3600 // 1 hour expiry
//   });

//   entry.clicks++;
//   await entry.save();

//   res.redirect(entry.originalUrl);
// };


const { client } = require("../config/redis");

const {
createShortUrlService,
getOriginalUrlService
} = require("../services/url.service");

// Create Short URL
exports.createShortUrl = async (req, res) => {
try {
  const { originalUrl } = req.body;

// Validation
  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

// Call service
const shortId = await createShortUrlService(originalUrl);

return res.status(201).json({
  shortUrl: `http://localhost:5000/${shortId}`
});

} 
catch (err) {
  console.error("Error creating short URL:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Redirect URL
exports.redirectUrl = async (req, res) => {
try {
  const { shortId } = req.params;

// 1. Check Redis cache
const cachedUrl = await client.get(shortId);

if (cachedUrl) {
  console.log("Cache HIT");
  return res.redirect(cachedUrl);
}

console.log("Cache MISS");

// 2. Fetch from DB via service
const entry = await getOriginalUrlService(shortId);

if (!entry) {
  return res.status(404).json({ error: "URL not found" });
}

// 3. Store in Redis
await client.set(shortId, entry.originalUrl, {
  EX: 3600
});

// 4. Increment clicks
entry.clicks += 1;
await entry.save();

// 5. Redirect
return res.redirect(entry.originalUrl);

} catch (err) {
  console.error("Error redirecting URL:", err);
    return res.status(500).json({ error: err.message });
  }
};