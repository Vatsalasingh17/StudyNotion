// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Load environment variables from the .env file
require("dotenv").config();

// Export a function named 'connect' that will establish a connection to MongoDB
exports.connect = () => {

    // Use mongoose to connect to MongoDB using the connection string from .env
    mongoose.connect(process.env.MONGO_URL, {
        // These options help handle MongoDB connection behavior and parsing
        useNewUrlParser: true,        // Use the new MongoDB URL string parser
        useUnifiedTopology: true,     // Use the new Server Discover and Monitoring engine
    })
    .then(() => console.log("DB Connected Successfully"))  // Log success message if connected
    .catch((error) => {              // Handle any connection errors
        console.log("DB Connection Failed");
        console.error(error);        // Log the detailed error for debugging
        process.exit(1);             // Exit the process with failure code
    });
};
