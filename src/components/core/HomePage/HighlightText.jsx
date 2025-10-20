import React from 'react'

// A functional React component that highlights a given piece of text
const HighlightText = ({ text }) => {
  return (
    // The <span> tag is used to style inline text.
    // Tailwind classes:
    // - font-bold: makes the text bold
    // - text-richblue-200: applies a custom text color from your Tailwind theme
    <span className='font-bold text-richblue-200'>
      {" "}
      {/* The space ensures proper spacing in case the text is concatenated */}
      {text} {/* The actual text passed as a prop is displayed here */}
    </span>
  )
}

// Export the component so it can be imported and used in other files
export default HighlightText
