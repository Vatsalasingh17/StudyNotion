import React, { useState } from "react"
import { useForm } from "react-hook-form" // For form handling and validation
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai" // Eye icons for show/hide password
import { useSelector } from "react-redux" // Redux hook to access state
import { useNavigate } from "react-router-dom" // For programmatic navigation

import { changePassword } from "../../../../services/operations/SettingsAPI" // API call to change password
import IconBtn from "../../../common/IconBtn" // Custom button component

export default function UpdatePassword() {
  // Get auth token from Redux store
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate() // To navigate programmatically

  // State to toggle visibility of password fields
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Initialize react-hook-form
  const {
    register, // Register input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Object containing validation errors
  } = useForm()

  // Function to handle password form submission
  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data) // Call API to change password
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message) // Log error if API call fails
    }
  }

  return (
    <>
      {/* Form container */}
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

          {/* Password input fields */}
          <div className="flex flex-col gap-5 lg:flex-row">

            {/* Current Password Field */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"} // Toggle type based on show/hide state
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })} // Required validation
              />
              {/* Eye icon to toggle visibility */}
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {/* Validation error message */}
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            {/* New Password Field */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"} // Toggle type based on show/hide state
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })} // Required validation
              />
              {/* Eye icon to toggle visibility */}
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {/* Validation error message */}
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cancel & Update Buttons */}
        <div className="flex justify-end gap-2">
          {/* Cancel button navigates back without saving */}
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          {/* Submit button triggers form submission */}
          <IconBtn typ
