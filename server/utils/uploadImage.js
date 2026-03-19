const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const cloudinaryConfig = require("../config/cloudinaryConfig");

/* 1. Initialize cloudinary once */
cloudinaryConfig();

/* 2. Create upload function */
const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    /* 3. Create upload stream */
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blogapp",
        transformation: [
          { width: 800, height: 600, crop: "limit" }, // resize
          { quality: "auto" }, // optimize quality
        ],
      },
      (error, result) => {
        /* 4. Handle result */
        if (error) return reject(error);

        /* 5. Return image URL + public id */
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    /* 6. Convert buffer → stream → pipe to cloudinary */
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadImage;
