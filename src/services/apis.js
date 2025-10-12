// =========================================
// 🔧 BASE URL CONFIGURATION
// =========================================

// The base URL for all API requests, loaded from environment variables.
// This allows the API endpoints to change dynamically between environments
// (e.g., development, staging, production) without modifying the code.
const BASE_URL = process.env.REACT_APP_BASE_URL;


// =========================================
// 🔐 AUTHENTICATION ENDPOINTS
// =========================================
// These endpoints handle user authentication processes such as signup, login,
// password reset, and sending OTPs.
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",                      // Send OTP for verification
  SIGNUP_API: BASE_URL + "/auth/signup",                        // Register a new user
  LOGIN_API: BASE_URL + "/auth/login",                          // Log in existing user
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",  // Generate token for password reset
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",         // Reset password using token
};


// =========================================
// 👤 PROFILE ENDPOINTS
// =========================================
// These APIs deal with fetching and updating user profile information.
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",          // Get full user profile details
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses", // Get all courses a user is enrolled in
};


// =========================================
// 🎓 STUDENT PAYMENT ENDPOINTS
// =========================================
// APIs that handle course payments and confirmations.
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",                // Capture payment for a course
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",                  // Verify successful payment
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail", // Send success email post-payment
};


// =========================================
// 📚 COURSE MANAGEMENT ENDPOINTS
// =========================================
// APIs for fetching, creating, updating, and deleting courses, sections, and subsections.
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",                     // Fetch all available courses
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",                  // Get details of a specific course
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",                           // Edit an existing course
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",              // Get all available course categories
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",                       // Create a new course
  CREATE_SECTION_API: BASE_URL + "/course/addSection",                        // Add a new section to a course
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",                  // Add a new subsection (lecture)
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",                     // Update a section
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",               // Update a subsection (lecture)
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",  // Fetch all courses created by an instructor
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",                     // Delete a section from a course
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",               // Delete a subsection (lecture)
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",                       // Delete a full course
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails", // Get complete details of a course (authenticated)
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",          // Mark a lecture as completed
  CREATE_RATING_API: BASE_URL + "/course/createRating",                       // Submit a rating/review for a course
};


// =========================================
// ⭐ RATINGS & REVIEWS ENDPOINTS
// =========================================
// API for fetching all course reviews.
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews", // Fetch all course reviews
};


// =========================================
// 🏷️ COURSE CATEGORIES API
// =========================================
// API for retrieving all available course categories.
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories", // Get list of all categories
};


// =========================================
// 🧭 CATALOG PAGE DATA
// =========================================
// API for fetching course data shown on category pages or catalog sections.
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails", // Get catalog/category page data
};


// =========================================
// 📞 CONTACT US API
// =========================================
// API endpoint for submitting contact form inquiries.
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact", // Send a contact-us form message
};


// =========================================
// ⚙️ SETTINGS PAGE ENDPOINTS
// =========================================
// APIs for updating user settings such as profile picture, password, and account deletion.
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture", // Update user profile picture
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",                 // Update user profile information
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",                 // Change user password
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",                // Permanently delete user profile
};
