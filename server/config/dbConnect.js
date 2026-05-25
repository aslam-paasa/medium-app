const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connecting Backend with Database MongoDB:
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connection established");
  } catch (err) {
    console.log("Error connecting", err);
    process.exit(1);
  }
};

module.exports = connectDB;
