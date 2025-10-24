// Import the mongoose library to define and interact with MongoDB schemas
const mongoose = require("mongoose");

// Import resetPasswordToken (though not typically needed directly inside a schema file)
// This import might be unnecessary unless you're using it within this file.
const { resetPasswordToken } = require("../controllers/ResetPassword");

// Define the schema for the "User" collection
const userSchema = new mongoose.Schema(
    {
        // User's first name
        firstName: {
            type: String,
            required: true,    // This field is mandatory
            trim: true,        // Removes whitespace from both ends of the string
        },

        // User's last name
        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        // User's unique email address (typically used for login)
        email: {
            type: String,
            required: true,
            trim: true,
            // 💡 You may also want to add "unique: true" for enforcing unique emails
        },

        // Hashed password for authentication
        password: {
            type: String,
            required: true,
        },

        // Type of user account — e.g., "Student", "Instructor", or "Admin"
        accountTypes: {
            type: String,
            required: true,
        },

        // Reference to the user's detailed profile information (stored in another collection)
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",    // Links to the "Profile" model
        },

        // Reference to the courses the user is enrolled in or teaches
        // ⚠️ Currently supports only one course. Use an array if multiple courses are needed.
        courses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",     // Links to the "Course" model
        },

        // URL or path of the user's profile image
        image: {
            type: String,
            required: true,
        },

        // Token used for account verification, session, or password reset
        token: {
            type: String,
            required: true,
        },

        // Expiration time for reset password token
        resetPasswordExpires: {
            type: String,      // 💡 Ideally should be a Date type for accurate expiration tracking
        },

        // Tracks user's progress in various courses
        // Each entry references a document in the "CourseProgress" collection
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CourseProgress",
            },
        ],
    }
);

// Export the model so it can be used elsewhere in the project
module.exports = mongoose.model("User", userSchema);
