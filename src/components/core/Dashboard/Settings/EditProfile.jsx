import { useForm } from "react-hook-form" // For form handling and validation
import { useDispatch, useSelector } from "react-redux" // Redux hooks
import { useNavigate } from "react-router-dom" // Navigation hook

import { updateProfile } from "../../../../services/operations/SettingsAPI" // API call to update profile
import IconBtn from "../../../common/IconBtn" // Custom button component

// List of gender options for the dropdown
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  // Get current user profile and auth token from Redux store
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate() // To programmatically navigate on cancel/save
  const dispatch = useDispatch() // Redux dispatch function

  // Initialize react-hook-form
  const {
    register, // Register input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Object containing validation errors
  } = useForm()

  // Function to handle form submission
  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data)) // Dispatch API call with token and form data
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message) // Log error if update fails
    }
  }

  return (
    <>
      {/* Form container */}
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information Section */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>

          {/* First Name & Last Name Inputs */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })} // Required validation
                defaultValue={user?.firstName} // Pre-fill with current value
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style"
                {...register("lastName", { required: true })} // Required validation
                defaultValue={user?.lastName} // Pre-fill with current value
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* Date of Birth & Gender Inputs */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Date of Birth */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0], // Max date is today
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth} // Pre-fill current value
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })} // Required validation
                defaultValue={user?.additionalDetails?.gender} // Pre-fill current value
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          {/* Contact Number & About Inputs */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Contact Number */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber} // Pre-fill current value
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })} // Required validation
                defaultValue={user?.additionalDetails?.about} // Pre-fill current value
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cancel & Save Buttons */}
        <div className="flex justify-end gap-2">
          {/* Cancel button navigates back without saving */}
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          {/* Save button triggers form submission */}
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}
