const express = require("express");
const router = express.Router();
const verifyLogin = require("./verifyLogin");

const logout = async (req, res) => {
  try {
    res.clearCookie("JWT_TOKEN");
    res.send("Logout Success!");
  } catch (e) {
    console.log(e);
    res.send("Error... Try Again");
  }
};

router.get("/logout", verifyLogin, logout);
module.exports = router;
