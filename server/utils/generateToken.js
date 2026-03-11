const jwt = require("jsonwebtoken");

const generateJWTToken = (payload) => {
  return jwt.sign(payload, "jwtsecretkey", { expiresIn: "1h" });
};

async function verifyJWT(token) {
  try {
    let data = await jwt.verify(token, "jwtsecretkey");
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
