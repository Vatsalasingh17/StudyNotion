import React from 'react'

// Importing custom components and assets
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    // Outer container with vertical spacing for the section
    <div className='mt-[130px] mb-32'>
      
      {/* Centered content wrapper */}
      <div className='flex flex-col gap-5 items-center'>

        {/* Heading with highlighted text */}
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          {/* HighlightText is a reusable component to emphasize specific words */}
          <HighlightText text={" learning any language"} />
        </div>

        {/* Subheading / Description text */}
        <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
          Using spin making learning multiple languages easy. 
          With 20+ languages, realistic voice-over, progress tracking, 
          custom schedules, and more.
        </div>

        {/* Image row showcasing learning features */}
        <div className='flex flex-row items-center justify-center mt-5'>

          {/* Image 1 - "Know your progress" */}
          <img 
            src={know_your_progress}
            alt="KnowYourProgressImage"
            className='object-contain -mr-32'
          />

          {/* Image 2 - "Compare with others" */}
          <img 
            src={compare_with_others}
            alt="CompareWithOthersImage"
            className='object-contain'
          />

          {/* Image 3 - "Plan your lessons" */}
          <img 
            src={plan_your_lesson}
            alt="PlanYourLessonImage"
            className='object-contain -ml-36'
          />
        </div>

        {/* Call-to-Action Button linking to signup page */}
        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
