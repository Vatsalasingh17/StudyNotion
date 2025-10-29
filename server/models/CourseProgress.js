// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema to track a user's progress in a specific course
const courseProgressSchema = new mongoose.Schema(
  {
    // Reference to the course the progress belongs to
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Links to the Course model
      required: true,
    },

    // List of completed videos (subsections) within that course
    // This should ideally be an array since a user can complete multiple videos
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection", // References the SubSection model (each video/lesson)
      },
    ],

    // (Optional) You could add a reference to the user who owns this progress
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the model to use it elsewhere in the app
module.exports = mongoose.model("CourseProgress", courseProgressSchema);
