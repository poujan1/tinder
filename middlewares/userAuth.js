const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const userAuth = async (req, res, next) => {
  try {
    const { token } = await req.cookies;

    if (!token) {
      throw new Error("Please login ");
    }

    const verifiedUser = await jwt.verify(token, "secret_key");

    if (!verifiedUser) {
      throw new Error("user verification failed");
    }
    const user = await User.findById({ _id: verifiedUser._id });
    if (!user) {
      throw new Error("cannot get profile ");
    }

    req.user = user;
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }

  next();
};
module.exports = userAuth;
