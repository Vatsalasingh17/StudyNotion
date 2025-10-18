import React from 'react'
import { Link } from "react-router-dom"

// A reusable Button component that can act as a navigation link
// Props:
// - children: content to display inside the button (text, icons, etc.)
// - active: boolean to determine the button's active state (affects styling)
// - linkto: URL path to navigate to when the button is clicked
const Button = ({ children, active, linkto }) => {
  return (
    // 'Link' is used for client-side routing without page reloads
    <Link to={linkto}>
      {/* Button styling changes based on the 'active' prop */}
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
        hover:scale-95 transition-all duration-200
        `}
      >
        {/* Render the button content passed as children */}
        {children}
      </div>
    </Link>
  )
}

export default Button
