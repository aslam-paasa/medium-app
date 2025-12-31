const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRoutes = express.Router();

userRoutes.post("/user", createUser);
userRoutes.post("/user/login", loginUser);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/user/:id", getUserById);
userRoutes.patch("/user/:id", updateUserById);
userRoutes.delete("/user/:id", deleteUserById);

module.exports = userRoutes;
