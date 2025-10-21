// Import required models and utilities
const Course = require("../models/Course");
const Category = require("../models/Category");
const Tag = require("../models/tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//----------------------------------------------
// Controller: CREATE COURSE
//----------------------------------------------
exports.createCourse = async (req, res) => {
  try {
    // Extract fields from request body
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    // Get uploaded thumbnail file
    const thumbnail = req.files?.thumbnailImage;

    // Validate all required fields
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Extract instructor ID from authenticated user (set by auth middleware)
    const userId = req.user.id;

    // Find instructor details using the user ID
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details:", instructorDetails);

    // Check if instructor exists
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // Validate tag (e.g., "Web Development", "Design", etc.)
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      });
    }

    // Upload thumbnail image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create a new course in the database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id, // ✅ fixed variable reference
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Add this new course to the instructor's course list
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//----------------------------------------------
// Controller: SHOW ALL COURSES
//----------------------------------------------
exports.showAllCourses = async (req, res) => {
  try {
    // Fetch all courses and populate instructor data
    const allCourses = await Course.find({}, {})
      .populate("instructor")
      .exec();

    // Respond with all courses
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data",
      error: error.message,
    });
  }
};

//----------------------------------------------
// Controller: GET COURSE DETAILS (BY ID)
//----------------------------------------------
exports.getCourseDetails = async (req, res) => {
  try {
    // Extract course ID from request body
    const { courseId } = req.body;

    // Find the course and populate related fields deeply
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails", // ✅ fixed typo (additonalDetails → additionalDetails)
        },
      })
      .populate("category") // Category reference
      .populate("ratingAndReviews") // ✅ make sure model field matches schema
      .populate({
        path: "courseContent", // Populate sections
        populate: {
          path: "subSection", // Populate subsections inside sections
        },
      })
      .exec();

    // Check if course exists
    if (!courseDetails || courseDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ID: ${courseId}`,
      });
    }

    // Send course details
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
