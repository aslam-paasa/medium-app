const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

async function verifyJWT(token) {
  try {
    let data = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: ", data);
    return data;
  } catch (err) {
    return false;
  }
}

async function decodeJWT(token) {
  let decoded = await jwt.decode(token);
  return decoded;
}

module.exports = { generateJWTToken, verifyJWT, decodeJWT };
