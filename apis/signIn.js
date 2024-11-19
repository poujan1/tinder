const User = require("../models/user");
const bcrypt = require("bcrypt");

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

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    res.send("login success..");
  } catch (e) {
    res.status(400).send(e.message);
  }
  res.send("login success");
};

module.exports = signIn;
