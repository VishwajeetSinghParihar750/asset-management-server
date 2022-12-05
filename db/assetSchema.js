const mongoose = require("mongoose");

let assetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("Asset", assetSchema);
module.exports.assetSchema = assetSchema;
