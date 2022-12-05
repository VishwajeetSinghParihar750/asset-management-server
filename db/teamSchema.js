const mongoose = require("mongoose");
const { assetSchema } = require("../db/assetSchema");

let teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  assets: [{ asset: assetSchema, count: Number }],
});

module.exports = mongoose.model("Team", teamSchema);
