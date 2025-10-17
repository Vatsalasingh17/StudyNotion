import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  // Get user data from the Redux store
  const { user } = useSelector((state) => state.profile)

  // Redux dispatch hook
  const dispatch = useDispatch()

  // React Router navigation hook
  const navigate = useNavigate()

  // Local state to control dropdown visibility
  const [open, setOpen] = useState(false)

  // Ref for detecting clicks outside of dropdown
  const ref = useRef(null)

  // Custom hook that closes the dropdown when clicking outside of it
  useOnClickOutside(ref, () => setOpen(false))

  // If no user data exists (not logged in), don't render anything
  if (!user) return null

  return (
    // Button wrapper for dropdown toggle
    <button className="relative" onClick={() => setOpen(true)}>
      {/* Display user avatar and dropdown caret */}
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {/* Dropdown menu — only visible when `open` is true */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevent click bubbling (so dropdown doesn't close immediately)
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          {/* Dashboard navigation link */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Logout button */}
          <div
            onClick={() => {
              dispatch(logout(navigate)) // Trigger logout and redirect
              setOpen(false) // Close dropdown after logging out
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
