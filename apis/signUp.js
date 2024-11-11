const User = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: encryptedPassword,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log(err);
    if (err) res.status(400).send(err.message);
  }
};
module.exports = { signUp };
