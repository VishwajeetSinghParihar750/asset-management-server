const express = require("express");
const Asset = require("../db/assetSchema");
const Team = require("../db/teamSchema");

const router = express.Router();

router.post("/createAsset", async (req, res) => {
  let { name, description, price, teamId } = req.body;

  if (!teamId) {
    return res.status(400).json("team does not exist !");
  }

  // checkign if asset name exists
  const assetWithName = await Asset.findOne({ name: name }).catch((e) =>
    console.log(e)
  );

  if (assetWithName) {
    return res.status(400).json("Asset name already taken !");
  }

  // saving asset

  let newAsset = new Asset({ name, price, description });
  await newAsset.save();
  // console.log("teamId : ", teamId);

  // saving current team
  let curTeam = await Team.findOne({ _id: teamId });
  // console.log("Team");
  curTeam.assets.push({ asset: newAsset, count: 0 });

  console.log(curTeam);

  curTeam.save();

  res.status(200).json({ message: "asset created !" });
});

module.exports = router;
