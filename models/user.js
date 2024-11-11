const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    age: {
      type: Number,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    desc: {
      type: String,
      default: Date.now(),
    },
    skills: {
      type: [String],
    },
    gender: {
      type: String,

      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
