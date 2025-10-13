import React from 'react'
import HighlightText from '../HomePage/HighlightText' // Importing custom component to highlight specific text

// Quote component – displays a motivational message about the platform's mission
const Quote = () => {
  return (
    // Wrapper div for the quote section
    <div>
      {/* Static text introducing the platform's purpose */}
      We are passionate about revolutionizing the way we learn. Our innovative platform
      
      {/* Highlighted part using the HighlightText component */}
      <HighlightText text={"combines technology"} />
      
      {/* Emphasized span for key word "expertise" */}
      <span className='text-brown-500'>
        {" "}
        expertise
      </span>
      , and community to create an 
      
      {/* Emphasized span for phrase "unparalleled educational experience" */}
      <span className='text-brown-500'>
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote // Exporting the component for use elsewhere in the app
