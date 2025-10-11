import React from 'react'

/**
 * IconBtn Component
 * 
 * A reusable button component that can display text, optional icons (children),
 * and supports customization through props such as `disabled`, `outline`, and `customClasses`.
 * 
 * Props:
 *  - text: string — The button label text.
 *  - onclick: function — The function to run when the button is clicked.
 *  - children: ReactNode — Optional elements (e.g., icons) to display next to the text.
 *  - disabled: boolean — Disables the button when true.
 *  - outline: boolean — (optional) Controls whether the button is outlined or filled (not used yet).
 *  - customClasses: string — (optional) Additional CSS classes for styling.
 *  - type: string — Specifies the button type (e.g., "button", "submit", "reset").
 */

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      // Disables the button if `disabled` is true
      disabled={disabled}

      // Event handler for click
      onClick={onclick}

      // Defines the button behavior (default, submit, reset)
      type={type}

      // Allows passing in custom CSS classes dynamically
      className={customClasses}
    >
      {/* If children (like icons) exist, render them alongside the text */}
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        // Otherwise, just render the text
        text
      )}
    </button>
  )
}

export default IconBtn
