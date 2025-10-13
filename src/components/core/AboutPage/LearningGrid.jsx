import React from 'react'
import HighlightText from '../HomePage/HighlightText' // Custom component to highlight specific text
import CTAButton from "../../core/HomePage/Button" // Custom Call-To-Action button component

// Array of objects defining the content and layout for each card in the learning grid
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
]

// LearningGrid component – displays a grid layout of feature cards based on LearningGridArray
const LearningGrid = () => {
  return (
    <div className='grid grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
      {/* Map through each card item in LearningGridArray */}
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            // Dynamically apply styles based on card order and index
            className={`
              ${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"} 
              ${
                card.order % 2 === 1
                  ? "bg-richblack-700 lg:h-[280px] p-5"
                  : "bg-richblack-800 lg:h-[280px] p-5"
              }
              ${card.order === 3 && "lg:col-start-2"}
              ${card.order < 0 && "bg-transparent"}
            `}
          >
            {/* Special layout for the first (intro) card */}
            {card.order < 0 ? (
              <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                {/* Heading with highlighted text */}
                <div className='text-4xl font-semibold'>
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>

                {/* Description paragraph */}
                <p className='font-medium'>
                  {card.description}
                </p>

                {/* Call-to-action button */}
                <div className='w-fit mt-4'>
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              // Layout for regular grid cards
              <div className='flex flex-col gap-8 p-7'>
                <h1 className='text-richblack-5 text-lg'>
                  {card.heading}
                </h1>
                <p className='text-richblack-300 font-medium'>
                  {card.description}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default LearningGrid // Exporting component for use in other parts of the app
