// Import the Axios library for making HTTP requests
import axios from "axios";

// Create a reusable Axios instance
// This allows you to set global configurations like baseURL, headers, interceptors, etc.
export const axiosInstance = axios.create({});

// Define a reusable API connector function for making API calls
// Parameters:
// - method: HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
// - url: The endpoint URL to send the request to
// - bodyData: The data to be sent in the request body (for POST, PUT, etc.)
// - headers: Optional custom headers
// - params: Optional query parameters
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        // The HTTP method, dynamically set from the function argument
        method: `${method}`,

        // The request URL
        url: `${url}`,

        // Include body data only if provided
        data: bodyData ? bodyData : null,

        // Include headers only if provided
        headers: headers ? headers : null,

        // Include query parameters only if provided
        params: params ? params : null,
    });
};
