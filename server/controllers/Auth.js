// Importing required modules and models
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

//----------------------------------------------
// Controller: SEND OTP
//----------------------------------------------
exports.sendOTP = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if the user is already registered
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already Registered",
      });
    }

    // Generate a 6-digit numeric OTP (no alphabets or special chars)
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated successfully:", otp);

    // Ensure OTP is unique (not already in DB)
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // Save OTP with email to the database
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP record saved:", otpBody);

    // Send success response
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp, // ⚠️ In production, you wouldn’t return OTP in response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//----------------------------------------------
// Controller: SIGN UP
//----------------------------------------------
exports.signUp = async (req, res) => {
  try {
    // Extract user details from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp, // ✅ You need this from frontend to verify
    } = req.body;

    // Validate all required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password values do not match, please try again",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // Find the most recent OTP for the given email
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("Recent OTP:", recentOtp);

    // If no OTP found
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Validate the OTP entered by user
    if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create profile details (assuming a Profile model exists)
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Create new user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

//----------------------------------------------
// Controller: LOGIN
//----------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please sign up first",
      });
    }

    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
      // Create JWT payload
      const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
      };

      // Sign the JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // Attach token to user (for frontend use)
      user.token = token;
      user.password = undefined; // hide password

      // Set cookie options
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true, // prevent JS access to cookie
      };

      // Send response with cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      // Invalid password
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};

//----------------------------------------------
// Controller: CHANGE PASSWORD (to be implemented)
//----------------------------------------------
exports.changePassword = async (req, res) => {
  // TODO: Implement password change functionality
  // Steps:
  // 1. Get oldPassword, newPassword, confirmNewPassword
  // 2. Verify old password
  // 3. Hash and save new password
  // 4. Send success/failure response
};
