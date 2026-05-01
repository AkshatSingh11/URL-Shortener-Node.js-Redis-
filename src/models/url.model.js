const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 }
});

module.exports = mongoose.model("URL", urlSchema);