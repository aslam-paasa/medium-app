/**
 * Authentication Middleware:
 * 1. User signs up / signs in → backend returns JWT token.
 * 2. Token is stored in localStorage on the frontend.
 * 3. Every protected API request sends this token in headers:
 *      Authorization: Bearer <token>
 * 4. This middleware extracts and verifies the token.
 * 5. If valid             → request proceeds to the next controller.
 * 6. If invalid / missing → user is asked to sign in again.
 */

const { verifyJWT } = require("../utils/generateToken.js");

async function verifyUser(req, res, next) {
  try {
    /* a. Read Authorization Header (coming from frontend ) */
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing. Please sign in.",
      });
    }

    /* 2. Extract token from "Bearer <token>" */
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format. Please sign in again.",
      });
    }

    /* 4. Verify token */
    let user = await verifyJWT(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please sign in again.",
      });
    }

    /* 5. Attach user into to request */
    req.user = user;
    console.log("Token verified successfully");

    /* 6. Move to next middleware/Controller */
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
}

module.exports = verifyUser;
