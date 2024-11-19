const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(emailId, password);

    if (!(emailId && password)) {
      throw new Error("EmailId and password is required");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid user");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = jwt.sign({ _id: user._id }, "secret_key");
      res.cookie("token", token);
      res.send("login success");
    }

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
};

module.exports = signIn;
