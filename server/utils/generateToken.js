const jwt = require("jsonwebtoken");

const generateJWTToken = (payload) => {
  return jwt.sign(payload, "secretKey", { expiresIn: "1h" });
};

module.exports = generateJWTToken;
