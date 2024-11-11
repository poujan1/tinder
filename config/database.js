const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ppujan36:paneru555@cluster0.7opuw.mongodb.net/tinder",
    );
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};
module.exports = connectDb;
