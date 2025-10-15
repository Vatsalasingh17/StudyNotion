// Import React hook for managing local state
import { useState } from "react"

// Import icons for showing and hiding passwords
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

// Import icon for the "Back to Login" link
import { BiArrowBack } from "react-icons/bi"

// Import Redux hooks:
// - useDispatch: sends actions to the Redux store
// - useSelector: retrieves specific pieces of data from the Redux store
import { useDispatch, useSelector } from "react-redux"

// Import React Router hooks:
// - useLocation: gives access to the current URL and parameters
// - useNavigate: allows programmatic navigation between routes
// - Link: provides navigation links without reloading the page
import { Link, useLocation, useNavigate } from "react-router-dom"

// Import the password reset operation from the auth API functions
import { resetPassword } from "../services/operations/authAPI"

// Define the UpdatePassword component
function UpdatePassword() {
  // Initialize navigation, dispatch, and location hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Extract the 'loading' value from Redux auth state
  // This determines if a request is currently being processed
  const { loading } = useSelector((state) => state.auth)

  // Local state for handling form inputs
  const [formData, setFormData] = useState({
    password: "",          // User’s new password
    confirmPassword: "",   // Confirmation of the new password
  })

  // Local state to toggle visibility of each password field
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Destructure password values for easy access
  const { password, confirmPassword } = formData

  // Function to handle input changes dynamically
  // Updates the corresponding field in formData based on input name
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value, // Update specific field
    }))
  }

  // Function that handles form submission for resetting password
  const handleOnSubmit = (e) => {
    e.preventDefault() // Prevent default page reload on submit

    // Extract the reset token from the URL (the last segment in pathname)
    // Example URL: /update-password/:token
    const token = location.pathname.split("/").at(-1)

    // Dispatch the resetPassword action with required parameters
    // This sends a request to update the password on the backend
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    // Outer container: centers content both vertically and horizontally
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      
      {/* Conditional rendering:
          Show loading spinner while the API call is in progress */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        // Main card container for the password reset form
        <div className="max-w-[500px] p-4 lg:p-8">
          
          {/* Heading for the page */}
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>

          {/* Subtext guiding the user */}
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you&apos;re all set.
          </p>

          {/* Form section for entering and confirming passwords */}
          <form onSubmit={handleOnSubmit}>
            
            {/* New password field */}
            <label className="relative">
              {/* Field label */}
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>

              {/* Password input */}
              <input
                required // Makes the field mandatory
                type={showPassword ? "text" : "password"} // Toggle visibility
                name="password" // Name key for tracking input
                value={password} // Controlled input
                onChange={handleOnChange} // Update state when typing
                placeholder="Enter Password"
                className="form-style w-full !pr-10" // Custom form styling
              />

              {/* Icon to toggle password visibility */}
              <span
                onClick={() => setShowPassword((prev) => !prev)} // Toggle state
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  // If password is visible, show "eye invisible" icon
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  // If password is hidden, show "eye" icon
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Confirm new password field */}
            <label className="relative mt-3 block">
              {/* Field label */}
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>

              {/* Confirm password input */}
              <input
                required
                type={showConfirmPassword ? "text" : "password"} // Toggle visibility
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />

              {/* Icon to toggle visibility for confirm password */}
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Submit button to reset password */}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          {/* Navigation link to go back to the login page */}
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// Export the component so it can be imported in other files
export default UpdatePassword
