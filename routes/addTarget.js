const express = require("express");
const User = require("../db/userSchema");
const Team = require("../db/teamSchema");

const router = express.Router();

router.post("/addTarget", async (req, res) => {
  const { name, description, category, team, admin } = req.body;

  // add new target
  const target = new Team({ name, description, category });
  await target.save();

  // add target to the teams list of member who initialised the target
  let adminUser = await User.findOne({ email: admin });
  adminUser.teams.push({
    teamName: target.name,
    teamId: target._id,
    description: target.description,
    category: target.category,
  });
  await adminUser.save();

  // send info to all team mates, use that in frontend while loading user
  let teamMembers = team.split(",");
  teamMembers.forEach(async (email) => {
    let memberByEmail = await User.findOne({ email: email });

    if (memberByEmail) {
      memberByEmail.messages.push({
        adminName: adminUser.name,
        adminEmail: adminUser.email,
        teamName: target.name,
        teamId: target._id,
      });
      memberByEmail.save();
    }
  });

  res.status(200).json({
    email: adminUser.email,
    name: adminUser.name,
    teams: adminUser.teams,
    messages: adminUser.messages,
  });
});

module.exports = router;
