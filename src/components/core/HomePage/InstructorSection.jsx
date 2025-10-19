import React from 'react'

// Importing assets and components
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'  // Icon for the CTA button

const InstructorSection = () => {
  return (
    // Outer container with top margin
    <div className='mt-16'>

      {/* Flex container to align image and text side-by-side */}
      <div className='flex flex-row gap-20 items-center'>

        {/* Left Section: Instructor image */}
        <div className='w-[50%]'>
          <img
            src={Instructor}
            alt="Instructor"
            className='shadow-white'
          />
        </div>

        {/* Right Section: Text content and CTA */}
        <div className='w-[50%] flex flex-col gap-10'>

          {/* Section heading with highlighted text */}
          <div className='text-4xl font-semibold w-[50%]'>
            Become an
            {/* HighlightText emphasizes the word "Instructor" */}
            <HighlightText text={" Instructor"} />
          </div>

          {/* Supporting paragraph describing the value proposition */}
          <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love.
          </p>

          {/* CTA Button linking to signup page */}
          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              {/* Button content: text + right arrow icon */}
              <div className='flex flex-row gap-2 items-center'>
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InstructorSection
