const User = require("../models/user.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    if (err) {
      res.status(400).send("error ");
    }
  }
};
const getUser = async (req, res) => {
  try {
    const { userId } = await req.params;
    const user = await User.find({ _id: userId });
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = await req.body._id;
    console.log(userId);
    await User.findByIdAndDelete(userId);
    res.send(`user deleted successfully`);
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(400).send("something went wrong");
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = await req.params;
    console.log(userId);
    const userupdate = await req.body;

    const allowedUpdate = ["firstName", "lastName", "age", "gender", "skills"];

    const isAllowed = Object.keys(userupdate).every((el) => {
      return allowedUpdate.includes(el);
    });

    if (!isAllowed) {
      throw new Error("Email or passowrd are not allowed to update");
    } else {
      await User.findByIdAndUpdate(userId, userupdate, {
        runValidators: true,
        returnDocument: "before",
      });

      res.send("user updated suceesfully..");
    }
  } catch (err) {
    if (err) {
      res.status(500).send(err.message);
    }
  }
};
//

module.exports = { getUsers, deleteUser, updateUser, getUser };
