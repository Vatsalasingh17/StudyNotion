// Import the Mongoose library
const mongoose = require("mongoose");

// Define the schema for courses
const courseSchema = new mongoose.Schema(
  {
    // Name/title of the course
    courseName: {
      type: String,
      // You can add required: true for validation if needed
      // required: true,
    },

    // A short description of what the course is about
    courseDescription: {
      type: String,
      // required: true,
    },

    // A brief summary of what students will learn in the course
    // This currently references a Section model — usually this field would be a String,
    // but if each "what you will learn" is stored in a separate document, this is fine.
    whatYouWillLearn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },

    // The main content of the course — typically an array of Section references
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    // Ratings and reviews related to this course
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

    // Price of the course
    price: {
      type: Number,
      // required: true,
    },

    // URL or file path to the course thumbnail image
    thumbnail: {
      type: String,
    },

    // Category or tag that the course belongs to (e.g., Web Development, Design, etc.)
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },

    // List of users who are enrolled in this course
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the model so it can be used throughout the app
module.exports = mongoose.model("Course", courseSchema);
