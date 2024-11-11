const express = require("express");
const connectDb = require("./config/database");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const { getUsers, deleteUser, updateUser, getUser } = require("./apis/user.js");
const { signUp } = require("./apis/signUp");

const server = express();
server.use(express.json());

server
  .post("/signUp", signUp)
  .get("/user", getUsers)
  .get("/user/:userId", getUser)
  .delete("/user", deleteUser)
  .patch("/user/:userId", updateUser);

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
