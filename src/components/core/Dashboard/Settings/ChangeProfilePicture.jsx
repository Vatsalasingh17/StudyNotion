import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  // Extract token from auth slice and user from profile slice of Redux store
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  // Local state to handle loading state, selected file, and image preview
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  // Reference to hidden file input to trigger it programmatically
  const fileInputRef = useRef(null)

  // Trigger file input click when user clicks "Select" button
  const handleClick = () => {
    fileInputRef.current.click()
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0] // Get the first selected file
    if (file) {
      setImageFile(file)  // Set selected file in state
      previewFile(file)   // Generate a preview
    }
  }

  // Generate a preview of the selected image using FileReader
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result) // Set preview image as base64 URL
    }
  }

  // Handle uploading the selected image
  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)  // Set loading state to true
      const formData = new FormData()
      formData.append("displayPicture", imageFile) // Append selected file to form data

      // Dispatch the API call to update display picture
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false) // Reset loading state once upload is done
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message) // Log error if upload fails
    }
  }

  // Update the preview whenever the selected image changes
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        {/* Profile picture and controls */}
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image} // Show preview if available, otherwise show current user image
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg" // Accept only specific image types
              />
              {/* Button to open file selector */}
              <button
                onClick={handleClick}
                disabled={loading} // Disable button while uploading
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              {/* Upload button */}
              <IconBtn
                text={loading ? "Uploading..." : "Upload"} // Show loading text when uploading
                onclick={handleFileUpload} // Trigger upload
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" /> // Show upload icon if not loading
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
