import React from 'react'  // Importing React library to use JSX

// Functional component to display a 404 error message
const Error = () => {
  return (
    // Center the text both horizontally and vertically using Flexbox
    // Apply large text size (3xl) and red color for emphasis
    <div className='flex justify-center items-center text-3xl text-red'>
      Error - 404 Not found
    </div>
  )
}

export default Error  // Exporting the component for use in routing or other parts of the app
