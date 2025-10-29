// Import the Mongoose library
const mongoose = require("mongoose");

// Define the schema for user profiles
const profileSchema = new mongoose.Schema(
  {
    // Gender of the user (e.g., "Male", "Female", "Other")
    gender: {
      type: String,
      // You could also add enum validation here, e.g.:
      // enum: ["Male", "Female", "Other"]
    },

    // Date of birth of the user
    dateOfBirth: {
      type: String, // Stored as a string (you could also use Date type)
    },

    // Short description or bio about the user
    about: {
      type: String,
      trim: true, // Removes extra spaces at the start and end
    },

    // User's contact number
    contactNumber: {
      type: Number,
      trim: true, // Not necessary for numbers, but doesn’t cause issues
      // You could add validation like match: [/^\d{10}$/, "Invalid phone number"]
    },
  },
  {
    // Optional: adds createdAt and updatedAt timestamps automatically
    timestamps: true,
  }
);

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model("Profile", profileSchema);
