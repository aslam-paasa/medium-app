const mongoose = require("mongoose");

/**
 * Designing Schema for Users:
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

/**
 * Creating Model for Users:
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
