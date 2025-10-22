// Import necessary models and utilities
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// =====================================
// Controller: Create a new SubSection
// =====================================
exports.createSubSection = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { sectionId, title, timeDuration, description } = req.body;

    // Extract video file from the request (uploaded via middleware like express-fileupload or multer)
    const video = req.files?.videoFiles;

    // Validate that all required fields are provided
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload the video file to Cloudinary
    // The uploadImageToCloudinary utility returns details like `secure_url`
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // Create a new SubSection document in the database
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url, // store Cloudinary video URL
    });

    // Add the newly created SubSection's ID to the parent Section document
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: { subSection: subSectionDetails._id },
      },
      { new: true } // returns the updated document
    );

    // Send success response to client
    return res.status(200).json({
      success: true,
      message: "Sub-section created successfully",
      data: {
        subSection: subSectionDetails,
        section: updatedSection,
      },
    });
  } catch (error) {
    // Handle server or runtime errors
    console.error("Error creating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create the subsection. Please try again later.",
      error: error.message,
    });
  }
};
