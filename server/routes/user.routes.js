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

userRoutes.post("/signup", createUser);
<<<<<<< HEAD
userRoutes.post("/signin", loginUser);
=======
userRoutes.post("/login", loginUser);
>>>>>>> 9e99a62ee751462a13aae26d38069f6298f359e6
userRoutes.get("/users", getAllUsers);
userRoutes.get("/user/:id", getUserById);
userRoutes.patch("/user/:id", updateUserById);
userRoutes.delete("/user/:id", deleteUserById);

module.exports = userRoutes;
