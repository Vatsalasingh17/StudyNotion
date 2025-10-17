import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  // Access loading state from Redux store (to show spinner while authenticating)
  const { loading } = useSelector((state) => state.auth)

  return (
    // Main container centers content vertically and horizontally
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        // If authentication or data fetching is in progress, show loading spinner
        <div className="spinner"></div>
      ) : (
        // Main content section (flex layout: column on mobile, row on desktop)
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          {/* Left Section — contains title, descriptions, and form */}
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            {/* Page Title */}
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>

            {/* Description text (two parts, one normal and one highlighted) */}
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>

            {/* Conditional rendering — show SignupForm or LoginForm based on prop */}
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Right Section — image stack (decorative frame + main image) */}
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            {/* Background frame image */}
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            {/* Foreground image (e.g., students or theme-based visual) */}
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
