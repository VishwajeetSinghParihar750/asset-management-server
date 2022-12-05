const { verify } = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const verifyLogin = (req, res, next) => {
  const token = req.cookies && req.cookies.JWT_TOKEN;

  console.log(token);

  if (!token) {
    return res.status(400).send("Login required !");
  }

  try {
    const data = verify(token, process.env.JWT_SECRET_KEY);
    console.log(data);
    res.data = data;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("Login required !");
  }
};
router.get("/verifyLogin", verifyLogin, (req, res) =>
  res.status(200).send("logged In")
);

module.exports = router;
