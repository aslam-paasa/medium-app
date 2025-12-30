const mongoose = require("mongoose");

/**
 * Connecting Backend with Database MongoDB:
 */
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.goyedz2.mongodb.net/blogDatabase"
    );
    console.log("DB connection established");
  } catch (err) {
    console.log("Error connecting", err);
    process.exit(1);
  }
};

module.exports = connectDB;
