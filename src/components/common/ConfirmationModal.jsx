import React from 'react'
import IconBtn from './IconBtn'  // Importing a custom button component with an icon

/**
 * ConfirmationModal Component
 * 
 * Displays a confirmation dialog with customizable text and buttons.
 * The modal receives all its data and handlers through the `modalData` prop.
 * 
 * @param {Object} modalData - Object containing modal text and button handlers:
 *   {
 *     text1: string,         // Primary message text
 *     text2: string,         // Secondary message text
 *     btn1Text: string,      // Label for the first (icon) button
 *     btn1Handler: function, // onClick handler for the first button
 *     btn2Text: string,      // Label for the second button
 *     btn2Handler: function  // onClick handler for the second button
 *   }
 */
const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      {/* Outer wrapper for the modal content */}
      <div>
        {/* Display the main and secondary text messages */}
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>

        {/* Button section */}
        <div>
          {/* First button uses the custom IconBtn component */}
          <IconBtn
            // (NOTE: should be 'onClick', not 'onclick' for React)
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          {/* Second button is a standard HTML button */}
          <button onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
