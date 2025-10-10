import React from "react"
import ContactUsForm from "./ContactUsForm" // Importing the contact form component

// Functional component that serves as a styled wrapper for the contact form section
const ContactForm = () => {
  return (
    // Outer container with border, background text color, rounded corners, and padding
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      
      {/* Heading section: Large bold title encouraging users to collaborate */}
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      
      {/* Subtext providing context and inviting the user to share details */}
      <p>
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      {/* Contact form container with top margin for spacing */}
      <div className="mt-7">
        {/* Rendering the ContactUsForm component */}
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
