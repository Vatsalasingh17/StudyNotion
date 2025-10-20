import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

// Array of tab names displayed at the top of the section
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  // ====== STATE VARIABLES ======

  // Keeps track of which tab is currently selected
  const [currentTab, setCurrentTab] = useState(tabsName[0]);

  // Stores the list of courses to be displayed for the selected tab
  const [courses, setCourses] = useState(HomePageExplore[0].courses);

  // Tracks the currently active course card (used for highlighting or expanding)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  // ====== HANDLER FUNCTION ======

  /**
   * Updates the current tab and corresponding courses when a tab is clicked.
   * @param {string} value - The name of the tab that was clicked.
   */
  const setMyCards = (value) => {
    setCurrentTab(value);

    // Filter the course data to match the selected tab
    const result = HomePageExplore.filter((course) => course.tag === value);

    // Update the displayed courses and set the first course as active
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  // ====== RENDER SECTION ======
  return (
    <div>
      {/* ========== Explore More Section Header ========== */}
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          {/* Section title with a highlighted phrase */}
          Unlock the
          <HighlightText text={"Power of Code"} />

          {/* Subtitle text */}
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* ========== Tabs Section ========== */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {/* Render each tab dynamically */}
        {tabsName.map((ele, index) => {
          return (
            <div
              key={index}
              // Conditional styling for active/inactive tabs
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              // When clicked, update the courses and active tab
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Empty spacer div for layout adjustment on large screens */}
      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* ========== Course Cards Section ========== */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {/* Render a CourseCard for each course in the selected tab */}
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}             // Data for each individual course
              currentCard={currentCard}  // Currently active card (for highlighting)
              setCurrentCard={setCurrentCard} // Function to change active card
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
