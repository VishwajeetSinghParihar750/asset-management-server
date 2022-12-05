const express = require("express");
const Asset = require("../db/assetSchema");
const Team = require("../db/teamSchema");

const router = express.Router();

router.post("/getAssets", async (req, res) => {
  let { teamId } = req.body;
  console.log("teamId : ", teamId);

  if (!teamId) {
    return res.status(400).json("team does not exist !");
  }

  // checkign if team  exists
  const teamById = await Team.findOne({ _id: teamId }).catch((e) =>
    console.log(e)
  );

  console.log(teamById);

  let { assets } = teamById;

  console.log(assets);

  res.status(200).json({ assets: assets });
});

module.exports = router;
