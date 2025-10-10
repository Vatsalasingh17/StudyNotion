import React from "react"
// Importing icons from different icon libraries
import * as Icon1 from "react-icons/bi"   // Boxicons
import * as Icon2 from "react-icons/io5"  // Ionicons
import * as Icon3 from "react-icons/hi2"  // Heroicons v2

// Array containing contact information for different contact methods
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight", // Icon name from Heroicons
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld", // Icon name from Boxicons
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall", // Icon name from Ionicons
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

// Functional React component to display contact details
const ContactDetails = () => {
  return (
    // Main container with background, padding, and rounded corners
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {/* Loop through each contact detail and render its section */}
      {contactDetails.map((ele, i) => {
        // Dynamically choose the correct icon component
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]

        return (
          // Individual contact item card
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i}
          >
            {/* Header section with icon and heading */}
            <div className="flex flex-row items-center gap-3">
              {/* Render the icon with a custom size */}
              <Icon size={25} />
              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>

            {/* Description text */}
            <p className="font-medium">{ele?.description}</p>

            {/* Contact detail (email, address, phone number, etc.) */}
            <p className="font-semibold">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
