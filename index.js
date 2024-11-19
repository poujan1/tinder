const express = require("express");

const connectDb = require("./config/database");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const { getUsers, deleteUser, updateUser, getUser } = require("./apis/user.js");
const { signUp } = require("./apis/signUp");
const cookieParser = require("cookie-parser");
const signIn = require("./apis/signIn.js");
const userAuth = require("./middlewares/userAuth");

const userProfile = require("./apis/profile");

const server = express();
server.use(express.json());
server.use(cookieParser());

server
  .post("/signUp", signUp)
  .get("/profile", userAuth, userProfile)
  .get("/user", getUsers)
  .get("/user/:userId", getUser)
  .delete("/user", deleteUser)
  .patch("/user/:userId", updateUser)
  .post("/signin", signIn);

connectDb()
  .then(() => {
    console.log("database connected successfully");
    server.listen(3000, () => {
      console.log("server is listening...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
