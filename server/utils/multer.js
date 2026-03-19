const multer = require("multer");

/* 1. Define allowed image types (security) */
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

/* 2. File filter (reject non-image files) */
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only image files (jpeg, png, webp) are allowed"),
      false,
    );
  }
  cb(null, true);
};

/* 3. Use memory storage (no uploads folder needed) */
const storage = multer.memoryStorage();

/* 4. Create multer instance with limits */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = upload;
