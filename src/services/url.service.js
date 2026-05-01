const URL = require("../models/url.model");
const { nanoid } = require("nanoid");

exports.createShortUrlService = async (originalUrl) => {
  const shortId = nanoid(6);

  const newUrl = await URL.create({
    shortId,
    originalUrl
  });

  return shortId;
};

exports.getOriginalUrlService = async (shortId) => {
  return await URL.findOne({ shortId });
};