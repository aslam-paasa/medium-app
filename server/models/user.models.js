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
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

/**
 * Creating Model for Users:
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
