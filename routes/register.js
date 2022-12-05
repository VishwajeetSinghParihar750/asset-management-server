const express = require("express");

const User = require("../db/userSchema");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../util/auth");

const router = express.Router();

// random testing
router.get("/register", (req, res) => {
  res.json({ message: "hi" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checkign if user exists
    const userWithEmail = await User.findOne({ email: email }).catch((e) =>
      console.log(e)
    );

    if (userWithEmail) {
      return res.status(400).json({ message: "User already Exists !" });
    }

    // saving user
    let hashedPassword = await hashPassword(password);

    let newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // sending response
    const jwtToken = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET_KEY
    );

    res.json({ message: "Welcome !", token: jwtToken });
  } catch (e) {
    res.status(400).json({ error: e });
    console.log(e);
  }
});

module.exports = router;
