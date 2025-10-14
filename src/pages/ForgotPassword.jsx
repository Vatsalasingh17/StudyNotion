import { useState } from "react"                    // React hook for managing local state
import { BiArrowBack } from "react-icons/bi"         // Icon for "Back to Login" link
import { useDispatch, useSelector } from "react-redux" // Redux hooks for dispatching actions and accessing store state
import { Link } from "react-router-dom"              // For client-side navigation between routes

import { getPasswordResetToken } from "../services/operations/authAPI" // Async function to trigger password reset API call

// ========================
// Forgot Password Component
// ========================
function ForgotPassword() {
  // Local state to store user email input
  const [email, setEmail] = useState("")
  // Boolean state to track whether the reset email has been sent
  const [emailSent, setEmailSent] = useState(false)
  
  // Redux hooks
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)  // Extract loading status from auth slice

  // -------------------------
  // Handles form submission
  // -------------------------
  const handleOnSubmit = (e) => {
    e.preventDefault()  // Prevent page reload on form submission
    // Dispatch the async action to send password reset email
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    // Wrapper div that centers content vertically and horizontally
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      
      {/* Show loading spinner while request is being processed */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        // Main content container
        <div className="max-w-[500px] p-4 lg:p-8">
          
          {/* Page heading changes depending on whether the email was sent */}
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          {/* Conditional description text */}
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          {/* Password Reset Form */}
          <form onSubmit={handleOnSubmit}>
            {/* Show email input field only if email hasn't been sent yet */}
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required                      // Makes field mandatory
                  type="email"                   // Ensures valid email format
                  name="email"
                  value={email}                  // Controlled input value
                  onChange={(e) => setEmail(e.target.value)} // Updates email state
                  placeholder="Enter email address"
                  className="form-style w-full"  // Custom Tailwind form styling
                />
              </label>
            )}

            {/* Submit or Resend button based on state */}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          {/* Back to Login link */}
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

export default ForgotPassword  // Exporting the component for use in routing
