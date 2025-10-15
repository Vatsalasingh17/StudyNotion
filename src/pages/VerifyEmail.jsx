// Import necessary React hooks
import { useEffect, useState } from "react"

// Import OtpInput component to handle 6-digit OTP inputs
import OtpInput from "react-otp-input"

// Import routing tools
import { Link, useNavigate } from "react-router-dom"

// Import icons for UI elements
import { BiArrowBack } from "react-icons/bi" // Back navigation icon
import { RxCountdownTimer } from "react-icons/rx" // Timer icon for resending OTP

// Import Redux tools for dispatching actions and selecting state
import { useDispatch, useSelector } from "react-redux"

// Import authentication actions for signup and OTP verification
import { sendOtp, signUp } from "../services/operations/authAPI"

// Main component: VerifyEmail
function VerifyEmail() {
  // Local state to store the user-entered OTP
  const [otp, setOtp] = useState("")

  // Extract signup-related data and loading state from Redux store
  const { signupData, loading } = useSelector((state) => state.auth)

  // Initialize Redux dispatch function
  const dispatch = useDispatch()

  // Initialize navigation hook for redirecting users
  const navigate = useNavigate()

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Prevent access to this page if signup data is missing
    // (For example, if the user tries to open /verify-email directly)
    if (!signupData) {
      navigate("/signup") // Redirect back to signup page
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Disabling dependency check because navigate shouldn't re-trigger unnecessarily
  }, [])

  // Handle OTP verification and final signup submission
  const handleVerifyAndSignup = (e) => {
    e.preventDefault() // Prevent default form submission behavior (page reload)

    // Destructure user data collected during signup
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData

    // Dispatch the signUp action with OTP and user data
    // This will send the OTP + form data to the backend for verification
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,       // User-entered verification code
        navigate   // Used to navigate after successful signup
      )
    )
  }

  return (
    // Outer container: centers content vertically and horizontally
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      
      {/* Display loading spinner while waiting for API response */}
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        // Main card container for the OTP verification UI
        <div className="max-w-[500px] p-4 lg:p-8">
          
          {/* Title */}
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>

          {/* Subtitle / description */}
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>

          {/* OTP Verification Form */}
          <form onSubmit={handleVerifyAndSignup}>
            
            {/* OTP input field (6 digits) */}
            <OtpInput
              value={otp} // Controlled input linked to local state
              onChange={setOtp} // Updates OTP value when user types
              numInputs={6} // Number of OTP boxes
              renderInput={(props) => (
                // Custom styling for each OTP input box
                <input
                  {...props}
                  placeholder="-" // Placeholder character for empty boxes
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              // Container styling for the group of input boxes
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            {/* Button to verify entered OTP and complete signup */}
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>

          {/* Navigation and resend OTP section */}
          <div className="mt-6 flex items-center justify-between">
            
            {/* Back to Signup link */}
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>

            {/* Resend OTP button */}
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))} // Resend OTP to user's email
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Export component for use in other parts of the app
export default VerifyEmail
