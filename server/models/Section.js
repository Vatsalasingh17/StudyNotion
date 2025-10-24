// Import the mongoose library to define and interact with MongoDB schemas
const mongoose = require("mongoose");

// Define the schema for a "Section"
// A Section typically represents a larger unit of a course, containing multiple SubSections
const sectionSchema = new mongoose.Schema(
    {
        // Name or title of the section (e.g., "Introduction to JavaScript")
        sectionName: {
            type: String,
            // You can add `required: true` to ensure every section has a name
        },

        // Array of SubSections that belong to this Section
        // Each section can have multiple sub-sections (videos, lessons, etc.)
        subSection: [
            {
                type: mongoose.Schema.Types.ObjectId,  // References the ObjectId of SubSection documents
                required: true,                       // Ensures that at least one SubSection exists
                ref: "SubSection",                    // Creates a relationship with the "SubSection" model
            }
        ],
    }
);

// Export the model so it can be used elsewhere in the project
module.exports = mongoose.model("Section", sectionSchema);
