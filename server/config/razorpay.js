// Import the Razorpay library to interact with Razorpay's payment gateway API
const Razorpay = require("razorpay");

// Create and export an instance of Razorpay using your API credentials
// These credentials are securely stored in environment variables for safety
exports.instance = new Razorpay({
    // The public key ID provided by Razorpay (used for client-side operations)
    key_id: process.env.RAZORPAY_KEY,

    // The secret key provided by Razorpay (used for server-side authentication)
    key_secret: process.env.RAZORPAY_SECRET,
});
