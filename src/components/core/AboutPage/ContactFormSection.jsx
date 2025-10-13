import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm' // Importing the ContactUsForm component

// ContactFormSection component displays a section with a heading, description, and the contact form
const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      {/* Section Heading */}
      <h1>
        Get in Touch
      </h1>

      {/* Short description encouraging users to fill the form */}
      <p>
        We'd love to hear from you, please fill out this form.
      </p>

      {/* Contact form container */}
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection // Exporting component for use in other parts of the app
