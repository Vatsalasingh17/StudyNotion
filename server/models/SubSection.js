// Import the mongoose library to define and work with MongoDB schemas
const mongoose = require("mongoose");

// Define the schema for a "SubSection"
// A SubSection typically represents a part (or video) inside a course section
const subSectionSchema = new mongoose.Schema(
    {
        // Title of the subsection (e.g., "Introduction to Variables")
        title: {
            type: String,
            // You can add "required: true" if every subsection must have a title
        },

        // Duration of the video or subsection content (e.g., "5:32" or "10 minutes")
        timeDuration: {
            type: String,
            // Could be stored as a String for flexibility, but you might consider using a Number (in seconds)
        },

        // Short description or summary of what this subsection covers
        description: {
            type: String,
        },

        // URL or path to the video file associated with this subsection
        videoUrl: {
            type: String,
            // You can also add validation here to ensure it's a valid URL
        },
    }
);

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model("SubSection", subSectionSchema);
