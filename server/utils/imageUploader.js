// Import the Cloudinary library and access the v2 API
const cloudinary = require('cloudinary').v2;

/**
 * Uploads an image file to Cloudinary with optional transformations.
 *
 * @param {Object} file - The image file object (e.g., from an upload form).
 * @param {string} folder - The Cloudinary folder where the image will be stored.
 * @param {number} [height] - Optional height to resize the image.
 * @param {number} [quality] - Optional quality value to compress the image.
 * @returns {Promise<Object>} - Returns a promise that resolves with the Cloudinary upload response.
 */
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    // Initialize upload options with the target folder
    const options = { folder };

    // If a height is provided, include it in the upload options
    if (height) {
        options.height = height;
    }

    // If a quality value is provided, include it in the upload options
    if (quality) {
        options.quality = quality;
    }

    // Automatically determine the file type (image, video, etc.)
    options.resource_type = "auto";

    // Upload the file to Cloudinary using the temporary file path
    // file.tempFilePath is typically provided by middleware like express-fileupload
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};
