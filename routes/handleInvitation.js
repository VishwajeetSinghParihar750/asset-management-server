const express = require("express");
const User = require("../db/userSchema");
const Team = require("../db/teamSchema");

const router = express.Router();

router.post("/handleInvitation", async (req, res) => {
  // handle rejections

  const { teamId, userEmail, notAccepted } = req.body;

  let currentUser = await User.findOne({ email: userEmail });

  // check if target exists

  // console.log("teamId : ", teamId);
  const target = await Team.findOne({ _id: teamId });

  if (!target) {
    currentUser.messages = currentUser.messages.filter((mes) => {
      return mes.teamId == teamId;
    });
    await currentUser.save();
    return res.status(400).json({
      message: "Team does not exist !",
      user: {
        email: currentUser.email,
        name: currentUser.name,
        teams: currentUser.teams,
        messages: currentUser.messages,
      },
    });
  }

  if (notAccepted) {
    currentUser.messages = currentUser.messages.filter((mes) => {
      return !target._id.equals(mes.teamId);
    });
    await currentUser.save();
    return res.status(200).json({
      message: "team added",
      user: {
        email: currentUser.email,
        name: currentUser.name,
        teams: currentUser.teams,
        messages: currentUser.messages,
      },
    });
  }

  // add target to the list of targets of member who accepted the target if not already a team member

  let isUser = false;
  currentUser.teams.forEach((team) => {
    if (target._id.equals(team.teamId)) {
      isUser = true;
    }
  });

  if (isUser) {
    return res.status(403).json({ message: "already a team member ! " });
  }

  currentUser.teams.push({
    teamName: target.name,
    teamId: target._id,
    description: target.description,
    category: target.category,
  });

  currentUser.messages = currentUser.messages.filter((mes) => {
    return !target._id.equals(mes.teamId);
  });

  // console.log(currentUser.messages);

  await currentUser.save();

  res.status(200).json({
    message: "team added",
    user: {
      email: currentUser.email,
      name: currentUser.name,
      teams: currentUser.teams,
      messages: currentUser.messages,
    },
  });
});

module.exports = router;
