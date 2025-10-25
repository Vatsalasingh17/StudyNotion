// Import the User model
const user = require("../models/User");

// Import JWT for token verification
const jwt = require("jsonwebtoken");

/**
 * Middleware: auth
 * ----------------
 * Verifies the JWT token sent by the client (in cookies, body, or headers).
 * If valid, attaches the decoded user data to req.user.
 * If invalid or missing, sends an appropriate error response.
 */
exports.auth = async (req, res, next) => {
  try {
    // Extract token from multiple possible locations
    const token =
      req.cookies.token ||
      req.body.token || // fixed typo: was "toekn"
      req.header("Authorization")?.replace("Bearer ", "");

    // If no token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      // Verify the token using the secret key
      const decode = await jwt.verify(token, process.env.JWT_SECRET); // fixed typo "LWT_SECRET" → "JWT_SECRET"
      console.log("Decoded token:", decode);

      // Attach user data from token to the request object
      req.user = decode;
    } catch (err) {
      // If token verification fails
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Catch any unexpected errors
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

/**
 * Middleware: isStudent
 * ---------------------
 * Grants access only if the authenticated user is a student.
 */
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

/**
 * Middleware: isInstructor
 * ------------------------
 * Grants access only if the authenticated user is an instructor.
 */
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

/**
 * Middleware: isAdmin
 * -------------------
 * Grants access only if the authenticated user is an admin.
 */
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
