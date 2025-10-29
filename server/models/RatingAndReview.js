// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for storing ratings and reviews
const ratingAndReviewsSchema = new mongoose.Schema(
  {
    // Reference to the user who gave the rating/review
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of the user
      required: true,                       // This field is mandatory
      ref: "User",                          // References the 'User' model
    },

    // Numeric rating given by the user
    rating: {
      type: Number,   // Example: 1–5
      required: true, // Must be provided
    },

    // Textual review provided by the user
    review: {
      type: String,
      required: true,
    },
  },
  {
    // Optional: automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the model to be used in other parts of the application
module.exports = mongoose.model("RatingAndReview", ratingAndReviewsSchema);
