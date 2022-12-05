const express = require("express");
const { comparePasswords } = require("../util/auth");

const User = require("../db/userSchema");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password); //

  const userWithEmail = await User.findOne({ email: email }).catch((e) =>
    console.log(e)
  );
  console.log("userWithEmail : ", userWithEmail);

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  }

  let verify = await comparePasswords(password, userWithEmail.password);

  if (!verify) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  }

  const jwtToken = jwt.sign(
    {
      id: userWithEmail._id,
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET_KEY
  );

  res
    .cookie("JWT_TOKEN", jwtToken, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      JWT_TOKEN: jwtToken,
      email: userWithEmail.email,
      name: userWithEmail.name,
      teams: userWithEmail.teams,
      messages: userWithEmail.messages,
    });
});

module.exports = router;
