const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRoutes = express.Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.patch("/users/:id", updateUserById);
userRoutes.delete("/users/:id", deleteUserById);

module.exports = userRoutes;
