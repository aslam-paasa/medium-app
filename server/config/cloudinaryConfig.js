const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function cloudinaryConfig() {
  const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

  if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing");
  }

  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
  });

  console.log("✅ Cloudinary configured successfully");
}

module.exports = cloudinaryConfig;
