const express = require("express");
const User = require("../db/userSchema");
const Team = require("../db/teamSchema");
const Asset = require("../db/assetSchema");

const router = express.Router();

router.post("/addAsset", async (req, res) => {
  const { assetId, count, teamId } = req.body;

  if (!teamId) {
    return res.status(400).json("team does not exist !");
  }

  // add new target
  const target = await Team.findOne({ _id: teamId });

  if (!target) {
    return res.status(400).json("team does not exist !");
  }

  console.log(assetId);

  let assetObj = target.assets.find((assetObj) => {
    return assetObj.asset._id == assetId;
  });
  if (assetObj) {
    assetObj.count = "" + (parseInt(assetObj.count) + parseInt(count));
    target.save();
  } else {
    return res.status(400).json("asset does not exist !");
  }

  res.status(200).json({ assets: target.assets });
});

module.exports = router;
