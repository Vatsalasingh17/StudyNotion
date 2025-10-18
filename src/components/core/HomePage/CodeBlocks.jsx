import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

// CodeBlocks Component
// Renders a two-column layout: one for text and buttons, another for animated code display
// Props:
// - position: determines flex direction (e.g. "flex-row" or "flex-row-reverse")
// - heading: main heading element (can include <HighlightText />)
// - subheading: supporting text below the heading
// - ctabtn1, ctabtn2: button configuration objects ({ active, linkto, btnText })
// - codeblock: the code snippet to animate
// - backgroudGradient: background gradient styling (not currently used)
// - codeColor: Tailwind color classes for code text
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,
  codeColor
}) => {
  return (
    // Main container: flex layout, adjustable position, spacing, and alignment
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      
      {/* ---------- Section 1: Text + Buttons ---------- */}
      <div className='w-[50%] flex flex-col gap-8'>
        {/* Heading (can include highlighted text via <HighlightText />) */}
        {heading}

        {/* Subheading text */}
        <div className='text-richblack-300 font-bold'>
          {subheading}
        </div>

        {/* CTA (Call To Action) Buttons */}
        <div className='flex gap-7 mt-7'>
          {/* First Button with icon */}
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          {/* Second Button */}
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* ---------- Section 2: Animated Code Block ---------- */}
      <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]'>
        
        {/* Line numbers column */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
          {/* Static line numbers (1–11) */}
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Code animation area */}
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            // The text sequence: show code, pause 2s, then repeat
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            // Styling ensures proper code formatting
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true} // prevents the "erasing" effect
          />
        </div>

      </div>
    </div>
  )
}

export default CodeBlocks
