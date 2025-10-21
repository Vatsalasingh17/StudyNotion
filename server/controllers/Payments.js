// Import required modules and utilities
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");

//----------------------------------------------
// Controller: CAPTURE PAYMENT & INITIATE ORDER
//----------------------------------------------
exports.capturePayment = async (req, res) => {
  try {
    // Extract course ID and user ID from request
    const { course_id } = req.body;
    const userId = req.user.id;

    // Validate course ID
    if (!course_id) {
      return res.json({
        success: false,
        message: "Please provide a valid course ID",
      });
    }

    // Fetch course details
    let course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    // Check if student is already enrolled
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled in this course",
      });
    }

    // Set Razorpay order details
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100, // Razorpay expects amount in paisa (1 INR = 100 paisa)
      currency,
      receipt: Math.floor(Math.random() * Date.now()).toString(), // unique receipt ID
      notes: {
        courseId: course_id,
        userId,
      },
    };

    // Create an order using Razorpay instance
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment response from Razorpay:", paymentResponse);

    // Send order details to frontend
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
      error: error.message,
    });
  }
};

//----------------------------------------------
// Controller: VERIFY RAZORPAY SIGNATURE (Webhook)
//----------------------------------------------
exports.verifySignature = async (req, res) => {
  try {
    // Secret key used for webhook verification
    const webhookSecret = "12345678";

    // Extract signature sent by Razorpay
    const signature = req.headers["x-razorpay-signature"];

    // Generate hash (HMAC SHA256) using webhook secret and request body
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    // Compare generated digest with Razorpay's signature
    if (signature === digest) {
      console.log("✅ Payment verified and authorised");

      // Extract course and user details from Razorpay payload
      const { courseId, userId } = req.body.payload.payment.entity.notes;

      try {
        // Enroll student in the course
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        if (!enrolledCourse) {
          return res.status(500).json({
            success: false,
            message: "Course not found",
          });
        }
        console.log("✅ Course enrollment updated:", enrolledCourse);

        // Add course to user's enrolled list
        const enrolledStudent = await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );
        console.log("✅ User enrollment updated:", enrolledStudent);

        // Send confirmation email to the student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          "Congratulations from CodeHelp!",
          "Congratulations! You have been successfully enrolled in your new CodeHelp course 🎉"
          // You can also use courseEnrollmentEmail template if it returns HTML
          // courseEnrollmentEmail(course.courseName, enrolledStudent.firstName)
        );
        console.log("📧 Email sent:", emailResponse);

        // Send success response
        return res.status(200).json({
          success: true,
          message: "Signature verified and course added successfully",
        });
      } catch (error) {
        console.error("Error updating enrollment:", error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      // Signature mismatch – unauthorized request
      return res.status(400).json({
        success: false,
        message: "Invalid signature or unauthorized request",
      });
    }
  } catch (error) {
    console.error("Error verifying Razorpay signature:", error);
    return res.status(500).json({
      success: false,
      message: "Error while verifying payment signature",
      error: error.message,
    });
  }
};
