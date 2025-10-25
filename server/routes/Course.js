// ********************************************************************************************************
//                                          IMPORTS
// ********************************************************************************************************

// Import required modules
const express = require("express");
const router = express.Router();

// ********************************************************************************************************
//                                          CONTROLLERS
// ********************************************************************************************************

// Course Controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

// Category Controllers
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Section Controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Section Controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

// Rating and Review Controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// ********************************************************************************************************
//                                          MIDDLEWARES
// ********************************************************************************************************

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// ********************************************************************************************************
//                                          COURSE ROUTES
// ********************************************************************************************************

/**
 * Routes related to course creation and management.
 * Only instructors are allowed to create or modify courses and their sections/subsections.
 */

// Create a new course (Instructor only)
router.post("/createCourse", auth, isInstructor, createCourse);

// Add a new section to an existing course (Instructor only)
router.post("/addSection", auth, isInstructor, createSection);

// Update a section in a course (Instructor only)
router.post("/updateSection", auth, isInstructor, updateSection);

// Delete a section from a course (Instructor only)
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Add a sub-section (lecture) to a section (Instructor only)
router.post("/addSubSection", auth, isInstructor, createSubSection);

// Update a sub-section (Instructor only)
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// Delete a sub-section (Instructor only)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Get a list of all available courses (Public route)
router.get("/getAllCourses", getAllCourses);

// Get details of a specific course by its ID (Public route)
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                          CATEGORY ROUTES
// ********************************************************************************************************

/**
 * Routes for managing course categories.
 * Only admins can create new categories.
 */

// Create a new category (Admin only)
router.post("/createCategory", auth, isAdmin, createCategory);

// Get a list of all categories (Public route)
router.get("/showAllCategories", showAllCategories);

// Get detailed information about a specific category and its courses (Public route)
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                          RATING AND REVIEW ROUTES
// ********************************************************************************************************

/**
 * Routes related to course ratings and reviews.
 * Only students can post reviews or ratings.
 */

// Create a new rating or review (Student only)
router.post("/createRating", auth, isStudent, createRating);

// Get average rating for a course (Public route)
router.get("/getAverageRating", getAverageRating);

// Get all ratings and reviews (Public route)
router.get("/getReviews", getAllRating);

// ********************************************************************************************************
//                                          EXPORT ROUTER
// ********************************************************************************************************

module.exports = router;
