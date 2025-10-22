// Import the Tag model
const Tag = require("../models/tags");

// ===========================
// Controller: Create a new Tag
// ===========================
exports.createTag = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { name, description } = req.body;

    // Validate input fields
    if (!name || !description) {
      return res.status(400).json({
        success: false, // should be false for validation errors
        message: "All fields are required",
      });
    }

    // Create a new Tag document in the database
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    // Log the newly created tag for debugging
    console.log(tagDetails);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
      tagDetails,
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false, // should be false for errors
      message: error.message,
    });
  }
};

// ===========================
// Controller: Get all Tags
// ===========================
exports.showAlltags = async (req, res) => {
  try {
    // Retrieve all tags from the database
    // If using Mongoose, `find()` is correct; if Sequelize, use `findAll()`
    const allTags = await Tag.find({}, { name: true, description: true });

    // Send response with all tags
    res.status(200).json({
      success: true,
      message: "All tags returned successfully",
      allTags,
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false, // should be false for errors
      message: error.message,
    });
  }
};
