// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the "Tag" model
const tagsSchema = new mongoose.Schema(
    {
        // The name of the tag (e.g., "JavaScript", "Web Development")
        name: {
            type: String,          // Data type: String
            required: true,        // This field must be provided
        },

        // A short description of what the tag represents
        description: {
            type: String,          // Optional text field
        },

        // Reference to a Course document (relationship between Tag and Course)
        // Note: This currently allows only one course per tag.
        // If you want multiple courses, use: [ { type: mongoose.Schema.Types.ObjectId, ref: "Course" } ]
        courses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",         // Tells Mongoose this refers to the "Course" model
        },
    }
);

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model("Tag", tagsSchema);
